import { CategoryOneCService } from '@erist-opt/category';
import { OptionService, OptionValuesOneCService } from '@erist-opt/options';
import {
  IInputCreateProductOneC,
  IProduct,
  IUpdateProductQuantities,
  Product,
  ProductDescription,
  ProductOptionValue,
  ICreateProductOptionValueOneC,
  ProductImage,
  IUpdateProductOneC,
  formatToHTML,
  ILogData,
} from '@erist-opt/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { ProductImageService } from './productImage.service';
import { ProductUserService } from './productUser.service';
import { CacheCategoryService, CacheFeaturedService } from '@erist-opt/redis';
import { MinioLocalService } from '@erist-opt/minio';
import { Notification1cService } from '@erist-opt/notification-1c';

const logData: ILogData = {
  processed: [],
  errorUpsert: [],
  created: [],
  errorCreated: [],
  updated: [],
  errorUpdated: [],
};

@Injectable()
export class ProductOneCService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductDescription)
    private productDescriptionRepository: Repository<ProductDescription>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    private readonly productImageService: ProductImageService,
    private readonly optionService: OptionService,
    private readonly optionValueOneCService: OptionValuesOneCService,
    private readonly categoryOneCService: CategoryOneCService,
    private readonly productUserSerivce: ProductUserService,
    private readonly cacheCategoryService: CacheCategoryService,
    private readonly cacheFeaturedService: CacheFeaturedService,
    private readonly minioLocalService: MinioLocalService,
    private readonly notification1cService: Notification1cService
  ) {}

  async syncProducts(syncProducts: any[]) {
    // обрабатываем Товары
    let sortOrder = 0;
    for (const product of syncProducts) {
      sortOrder++;
      try {
        await this.upsertProduct(product, sortOrder);
        logData.processed.push({
          id1c: product.id1c,
          timestamp: new Date().toISOString(),
        });
        console.log(`sync product id1c = ${product.id1c} in processed`);
      } catch (error) {
        logData.errorUpsert.push({
          id1c: product.id1c,
          errorMessage: error.message,
          timestamp: new Date().toISOString(),
        });
        console.error(
          `Error processing product ${product.id1c}:`,
          error.message
        );
      }
      await this.delay(100);
    }
    // Отключаем товары, которых нет в обмене
    await this.deactivateProductsNotInSync(syncProducts);
    await this.cacheCategoryService.delAllCategories();
    await this.cacheCategoryService.delCategoriesTree('cat_TREE');
    await this.cacheFeaturedService.delFeatureds('featureds');

    // Создаем файл снапшота с логами
    await this.notification1cService.sendSnapshotNotification(
      logData,
      'product'
    );

    logData.processed = [];
    logData.errorUpsert = [];
    logData.created = [];
    logData.errorCreated = [];
    logData.updated = [];
    logData.errorUpdated = [];
  }

  private async upsertProduct(product: any, sortOrder: number) {
    const existingProduct = await this.findOneById1C(product.id1c);

    if (!existingProduct) {
      await this.createProduct(product, sortOrder);
      return;
    }
    await this.updateProduct(product, sortOrder, existingProduct.id); //, existingProduct.id
  }

  private async updateProduct(
    product: any,
    sortOrder: number,
    productId: string
  ) {
    try {
      const optionInserts: ICreateProductOptionValueOneC[] = await Promise.all(
        product.options.map(async (option: any) => {
          const optionValue =
            await this.optionValueOneCService.findOneOptionValueById1c(
              option.optionId
            );
          if (!optionValue) {
            console.warn('Опция не найдена по значению');
            return null;
          }
          return {
            optionId: optionValue.option.id, // ид опции (размер цвет) НЕ ИЗ 1С
            valueId: optionValue.id, // ид значения опции (s m l) НЕ ИЗ 1С
            price: option.price,
            quantity: option.quantity ?? 0,
            href: option.href || null,
          } as ICreateProductOptionValueOneC;
        })
      );
      // console.warn(optionInserts);

      const validOptionInserts = optionInserts.filter((o) => o !== null);
      const totalQuantity = validOptionInserts.reduce(
        (sum, option) => sum + option.quantity,
        0
      );
      const price =
        validOptionInserts.length > 0 ? validOptionInserts[0].price : 0;

      // Обнуление цены опций после использования цены товара
      validOptionInserts.forEach((option) => (option.price = 0));

      const categories: string[] = [];
      await Promise.all(
        product.categoryId1C.map(async (categoryId: any) => {
          const category = await this.categoryOneCService.getCategoryById1c(
            categoryId
          );
          if (!category) {
            return;
          }
          categories.push(category.id);
        })
      );

      const productUpdate: IUpdateProductOneC = {
        id: productId,
        id1c: product.id1c,
        model: product.model || '-',
        price: typeof price === 'number' ? price * 0.6 : 0,
        quantity: totalQuantity ?? 0,
        maincategory: categories[0],
        categories: categories,
        status: totalQuantity > 0 && price > 0 ? true : false,
        sortOrder: sortOrder,
        description: {
          name: product.name ?? 'Без имени',
          description:
            product.description ??
            'Пока что описания нет, но оно обязательно появится',
          compound: product.compound || null,
          model_parameters: product.model_parameters || null,
          care: product.care || null,
          parameters: product.parameters || null,
        },
        optionValues: validOptionInserts,
      };
      // console.warn('product.name', product.name);

      console.log('Update product id1c: ', productUpdate.id1c);
      await this.updateProductOnBase(productUpdate);
      logData.updated.push({
        id1c: product.id1c,
        name: product.name,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error ОБНОВЛЕНИЯ product:', error.message);

      logData.errorUpdated.push({
        id1c: product.id1c,
        name: product.name,
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  private async createProduct(product: any, sortOrder: number) {
    try {
      const optionInserts: ICreateProductOptionValueOneC[] = await Promise.all(
        product.options.map(async (option: any) => {
          //TODO interface
          const optionValue =
            await this.optionValueOneCService.findOneOptionValueById1c(
              option.optionId
            );
          if (!optionValue) {
            console.warn('Опция не найдена по значению');
            return null;
          }
          // console.warn(option);

          const data = {
            optionId: optionValue.option.id, // ид опции (размер цвет) НЕ ИЗ 1С
            valueId: optionValue.id, // ид значения опции (s m l) НЕ ИЗ 1С
            price: option.price ?? 0,
            quantity: option.quantity ?? 0,
            href: option.href || null,
          } as ICreateProductOptionValueOneC;
          // console.warn(data);
          return data;
        })
      );
      const validOptionInserts = optionInserts.filter((o) => o !== null);
      const totalQuantity = validOptionInserts.reduce(
        (sum, option) => sum + option.quantity,
        0
      );
      const price =
        validOptionInserts.length > 0 ? validOptionInserts[0].price : 0;

      const categories: string[] = [];
      await Promise.all(
        product.categoryId1C.map(async (categoryId: any) => {
          //TODO interface
          const category = await this.categoryOneCService.getCategoryById1c(
            categoryId
          );
          if (!category) {
            // console.warn('Категория не найдена по значению из 1с');
            return;
          }
          categories.push(category.id);
        })
      );

      const productInsert: IInputCreateProductOneC = {
        id1c: product.id1c,
        model: product.model || '-',
        price: price ?? 0,
        quantity: totalQuantity ?? 0,
        maincategory: categories[0],
        categories: categories,
        status: false, // Потому что нет картинки
        // status: totalQuantity > 0 && price > 0 ? true : false,
        sortOrder: sortOrder,
        description: {
          name: product.name ?? 'Без имени',
          description:
            product.description ??
            'Пока что описания нет, но оно обязательно появится',
          compound: product.compound || null,
          model_parameters: product.model_parameters || null,
          care: product.care || null,
          parameters: product.parameters || null,
        },
        optionValues: validOptionInserts,
        images: [
          {
            imageNameMinio: 'no_image_product.webp',
            sortOrder: 0,
          },
        ],
      };

      console.log('Create product id1s: ', productInsert.id1c);

      await this.createProductOnBase(productInsert);
      logData.created.push({
        id1c: product.id1c,
        name: product.name,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error creating product:', error.message);
      logData.errorCreated.push({
        id1c: product.id1c,
        name: product.name,
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  /**
   * Создает новый продукт с указанными данными.
   * @param input Данные для создания продукта.
   * @returns {Promise<IProduct>} Промис с объектом созданного продукта.
   *
   * Этот метод создает новую запись продукта в базе данных, а также создает его описание и изображения.
   */
  async createProductOnBase(
    payload: IInputCreateProductOneC
  ): Promise<IProduct | null> {
    const queryRunner =
      this.productRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // Создаем продукт
      const product = this.productRepository.create({
        id1c: payload.id1c,
        price: payload.price,
        model: payload.model || '-',
        quantity: payload.quantity ?? 0,
        maincategory: payload.maincategory,
        categories: payload.categories,
        status: payload.status,
        sortOrder: payload.sortOrder,
      });

      // Сохраняем продукт
      await queryRunner.manager.save(product);

      // Создаем описание продукта
      const productDescription = this.productDescriptionRepository.create(
        payload.description
      );

      // Сохраняем описание продукта
      const savedDescription = await queryRunner.manager.save(
        productDescription
      );

      // Связываем описание продукта с самим продуктом
      product.description = savedDescription;

      // Обновляем и сохраняем продукт с корректным descriptionId
      queryRunner.manager.save(product);

      // Создаем и сохраняем значения опций продукта
      for (const optionValueInput of payload.optionValues) {
        const option = await this.optionService.findOneOption(
          optionValueInput.optionId
        );

        const value = await this.optionService.findOneOptionValue(
          optionValueInput.valueId
        );

        if (!value || !option) {
          throw new Error('Не найдена опция или значение');
        }

        if (option && value) {
          const productOptionValue = new ProductOptionValue();
          productOptionValue.product = product;
          productOptionValue.option = option;
          productOptionValue.value = value;
          productOptionValue.price = 0;
          productOptionValue.quantity = optionValueInput.quantity ?? 0;

          // Сохраняем созданную ProductOptionValue
          await queryRunner.manager.save(productOptionValue);
        }
      }

      const productImages = await Promise.all(
        payload.images.map(async (image) => {
          const newImageUrl = await this.productImageService.newImageUrl(
            image.imageNameMinio
          );
          const productImage = this.productImageRepository.create({
            productIdOneC: product.id1c,
            imageNameMinio: image.imageNameMinio,
            image: newImageUrl,
            sortOrder: image.sortOrder,
            product: product, // Связываем изображение с продуктом
          });
          return productImage;
        })
      );

      // Сохраняем изображения продукта
      await queryRunner.manager.save(productImages);

      // Фиксируем транзакцию
      await queryRunner.commitTransaction();

      // Получаем сохраненный продукт с описанием, изображениями и опциями
      const savedProduct = await this.productRepository.findOne({
        where: { id1c: product.id1c },
      });
      if (!savedProduct) {
        return null;
      }

      return savedProduct;
    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
      await queryRunner.rollbackTransaction();
      throw new Error('Ошибка при создании продукта');
    } finally {
      await queryRunner.release();
    }
    // return null;
  }

  private async checkIfOptionValueExists(
    productId: string,
    valueId: string
  ): Promise<boolean> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['optionValues', 'optionValues.value'],
    });

    if (!product) {
      throw new Error('Продукт не найден');
    }

    //  существует ли valueId в optionValues продукта
    const exists = product.optionValues.some(
      (optionValue) => optionValue.value.id === valueId
    );

    return exists;
  }

  async updateProductOnBase(
    payload: IUpdateProductOneC
  ): Promise<IProduct | null> {
    const queryRunner =
      this.productRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Найти продукт по id
      const product = await this.productRepository.findOne({
        where: { id: payload.id },
        relations: [
          'description',
          'optionValues',
          'optionValues.option',
          'optionValues.value',
        ],
      });

      if (!product) {
        throw new Error('Продукт не найден');
      }

      // Обновляем данные продукта
      product.price = payload.price ?? 0;
      product.model = payload.model ?? product.model;
      product.quantity = payload.quantity ?? 0;
      product.maincategory = payload.maincategory ?? product.maincategory;
      product.categories = payload.categories ?? product.categories;

      let status = payload.status;
      // console.warn(status, 'Изначальный статус у товара до проверки картинки');

      if (status) {
        const productImage =
          await this.productImageService.getProductsImagesNoImage(payload.id);

        if (productImage) {
          status = false;
          // console.warn('Статус должен быть FALSE ибо изображения у товара нет');
        }

        // status = productImage.length === 0 ? true : false;
      }
      // console.warn(status, 'Сохраняем данный статус у товара');

      product.status = status;
      product.sortOrder = payload.sortOrder ?? product.sortOrder;

      // Обновляем существующее описание продукта
      if (product.description) {
        product.description.name = payload.description.name;
        product.description.description = formatToHTML(
          payload.description.description
        );
        product.description.compound = formatToHTML(
          payload.description.compound
        );
        product.description.model_parameters = formatToHTML(
          payload.description.model_parameters
        );
        product.description.care = formatToHTML(payload.description.care);
        product.description.parameters = formatToHTML(
          payload.description.parameters
        );
        await queryRunner.manager.save(product.description);
      } else {
        // Если описание отсутствует, создаем новое
        const productDescription = this.productDescriptionRepository.create(
          payload.description
        );
        const savedDescription = await queryRunner.manager.save(
          productDescription
        );
        product.description = savedDescription;
      }

      // Обновляем продукт с новым описанием
      await queryRunner.manager.save(product);

      // // Обновляем продукт с новым описанием
      // await queryRunner.manager.save(product);

      // Удаляем старые опции, которые больше не нужны
      const existingOptionValues = product.optionValues.map(
        (ov) => ov.value.id
      );
      // console.warn('existingOptionValues', existingOptionValues);

      const newOptionValueIds = payload.optionValues.map(
        (ov: any) => ov.valueId
      );
      // console.warn('newOpt', newOptionValueIds);

      const optionValuesToRemove = existingOptionValues.filter(
        (id) => !newOptionValueIds.includes(id)
      );

      // console.warn('optionValuesToRemove', optionValuesToRemove);

      if (optionValuesToRemove.length > 0) {
        const filteredOptionValues: string[] = [];

        for (const optionValue of optionValuesToRemove) {
          // console.warn(optionValue);

          // Найти опцию по productId и valueId
          const productOption =
            await this.productUserSerivce.findOptionByProductAndValue(
              product.id,
              optionValue
            );

          // console.warn(filteredOptionValues);
          // console.warn(productOption, 'productOption');

          // Проверяем что опция существует и её имя "Размеры" ибо цвета не надо трогать
          if (productOption && productOption.option.name === 'Размеры') {
            filteredOptionValues.push(optionValue);
          }
        }
        // console.warn(optionValuesToRemove);

        // Если после фильтрации есть значения, удаляем их
        if (filteredOptionValues.length > 0) {
          await this.optionService.deleteProductOptionValueByValueIds(
            filteredOptionValues
          );
        }
      }

      // Добавляем новые или обновляем существующие опции
      for (const optionValueInput of payload.optionValues) {
        const option = await this.optionService.findOneOption(
          optionValueInput.optionId
        );
        const value = await this.optionService.findOneOptionValue(
          optionValueInput.valueId
        );

        if (!option || !value) {
          throw new Error('Не найдена опция или значение');
        }

        let productOptionValue = product.optionValues.find(
          (ov) => ov.option?.id === option.id && ov.value?.id === value.id
        );

        if (productOptionValue) {
          // Обновляем существующую опцию
          productOptionValue.quantity = optionValueInput.quantity;
          productOptionValue.price = optionValueInput.price;
          await queryRunner.manager.save(productOptionValue);
        } else {
          // Создаем новую опцию
          productOptionValue = new ProductOptionValue();
          productOptionValue.product = product;
          productOptionValue.option = option;
          productOptionValue.value = value;
          productOptionValue.price = optionValueInput.price;
          productOptionValue.quantity = optionValueInput.quantity;

          await queryRunner.manager.save(productOptionValue);
        }
      }

      // Фиксируем транзакцию
      await queryRunner.commitTransaction();

      // Получаем обновленный продукт с описанием и опциями
      const updatedProduct = await this.productRepository.findOne({
        where: { id1c: product.id1c },
        relations: ['description', 'optionValues'],
      });

      return updatedProduct || null;
    } catch (error) {
      // console.error('Ошибка при обновлении продукта:', error.message);
      await queryRunner.rollbackTransaction();
      throw new Error('Ошибка при обновлении продукта');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Обновляет остатки товара и остатков опций.
   * @param input Данные для обновления остатков.
   * @returns {Promise<void>}
   *
   * Этот метод обновляет количество товара и опций, связанных с ним, в базе данных.
   */
  async updateProductQuantities(
    input: IUpdateProductQuantities
  ): Promise<void> {
    const queryRunner =
      this.productRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Обновляем количество товара
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: input.productId },
        relations: [
          'optionValues',
          'optionValues.option',
          'optionValues.value',
        ],
      });

      if (!product) {
        throw new Error('Продукт не найден');
      }

      // Обновляем количество товара
      product.quantity = input.newQuantity;
      await queryRunner.manager.save(product);

      // Обновляем опции продукта
      const productOptionValue = product.optionValues.find(
        (optionValue) => optionValue.id === input.optionValues.valueId
      );

      if (!productOptionValue) {
        throw new Error(
          `Не найдена опция с valueId: ${input.optionValues.valueId}`
        );
      }

      // Обновляем количество опции по ее id
      productOptionValue.quantity = input.optionValues.newQuantity;
      await queryRunner.manager.save(productOptionValue);

      // Фиксируем транзакцию
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Ошибка при обновлении остатков товара:', error);
      await queryRunner.rollbackTransaction();
      throw new Error('Ошибка при обновлении остатков товара');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Отключает товары, которые отсутствуют в списке синхронизированных продуктов.
   * @param syncProducts Список синхронизированных продуктов.
   * @returns {Promise<void>}
   */
  async deactivateProductsNotInSync(syncProducts: any[]): Promise<void> {
    try {
      // Получаем список id1c продуктов, которые есть в обмене
      const syncProductIds1C = syncProducts.map((product) => product.id1c);

      // Получаем все продукты из базы данных, у которых заполнено поле id1c
      const productsWithId1C = await this.productRepository.find({
        where: { id1c: Not(IsNull()) }, // Товары, у которых заполнено поле id1c
      });

      // Отфильтровываем продукты, которые отсутствуют в синхронизированном списке
      const productsToDeactivate = productsWithId1C
        .filter((product) => !syncProductIds1C.includes(product.id1c))
        .map((product) => product.id);

      // Обновляем статус для продуктов, которые не в списке синхронизированных
      if (productsToDeactivate.length > 0) {
        await this.productRepository.update(
          { id: In(productsToDeactivate) },
          { status: false }
        );
        // console.log(
        //   `Отключены товары с ID: ${productsToDeactivate.join(', ')}`
        // );
      }
    } catch (error) {
      console.error('Ошибка при отключении товаров:', error.message);
      throw new Error('Ошибка при отключении товаров');
    }
  }

  /**
   * Возвращает продукт по его идентификатору для корзины.
   * @param id Идентификатор продукта.
   * @returns {Promise<IProduct | null>} Промис с объектом продукта или null, если не найдено.
   *
   * Этот метод возвращает продукт из базы данных по его идентификатору 1C
   */
  async findOneById1C(id1c: string): Promise<IProduct | null> {
    const product = await this.productRepository.findOne({
      where: { id1c: id1c },
    });

    if (!product) {
      return null;
    }
    return product;
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // async updateProductOnBase(
  //   payload: IUpdateProductOneC
  // ): Promise<IProduct | null> {
  //   const queryRunner =
  //     this.productRepository.manager.connection.createQueryRunner();
  //   await queryRunner.startTransaction();

  //   try {
  //     // Найти продукт по id
  //     const product = await this.productRepository.findOne({
  //       where: { id: payload.id },
  //       relations: [
  //         'description',
  //         'optionValues',
  //         'optionValues.option',
  //         'optionValues.value',
  //       ],
  //     });

  //     if (!product) {
  //       throw new Error('Продукт не найден');
  //     }

  //     // Обновляем данные продукта
  //     product.price = payload.price ?? product.price;
  //     product.model = payload.model ?? product.model;
  //     product.quantity = payload.quantity ?? product.quantity;
  //     product.maincategory = payload.maincategory ?? product.maincategory;
  //     product.categories = payload.categories ?? product.categories;
  //     product.status = payload.status ?? product.status;
  //     product.sortOrder = payload.sortOrder ?? product.sortOrder;

  //     // Создаем описание продукта
  //     const productDescription = this.productDescriptionRepository.create(
  //       payload.description
  //     );

  //     // Сохраняем описание продукта
  //     const savedDescription = await queryRunner.manager.save(
  //       productDescription
  //     );

  //     // Связываем описание продукта с самим продуктом
  //     product.description = savedDescription;

  //     // Обновляем продукт с новым описанием
  //     await queryRunner.manager.save(product);

  //     console.warn('product', product);
  //     const optionValueId =
  // await this.productUserSerivce.findOptionByIdProductOpption(
  //   product?.optionValues[0].id
  // );
  //     console.warn('optValueId', optionValueId?.value.id);

  //     // Удаляем старые опции, которые больше не нужны
  //     const existingOptionValues = product.optionValues.map((ov) => ov.id);
  //     console.warn('existingOptionValues', existingOptionValues);

  //     const newOptionValueIds = payload.optionValues.map(
  //       (ov: any) => ov.valueId
  //     );
  //     console.warn('newOpt', newOptionValueIds);
  //     return null;

  //     const optionValuesToRemove = existingOptionValues.filter(
  //       (id) => !newOptionValueIds.includes(id)
  //     );

  //     if (optionValuesToRemove.length > 0) {
  //       await queryRunner.manager.delete(ProductOptionValue, {
  //         id: In(optionValuesToRemove),
  //       });
  //     }

  //     // Добавляем новые или обновляем существующие опции
  //     // for (const optionValueInput of payload.optionValues) {
  //     //   const option = await this.optionService.findOneOption(
  //     //     optionValueInput.optionId
  //     //   );
  //     //   const value = await this.optionService.findOneOptionValue(
  //     //     optionValueInput.valueId
  //     //   );

  //     //   if (!option || !value) {
  //     //     throw new Error('Не найдена опция или значение');
  //     //   }

  //     //   // Найти существующую опцию для обновления
  //     //   let productOptionValue = product.optionValues.find(
  //     //     (ov) => ov.option?.id === option.id && ov.value?.id === value.id
  //     //   );

  //     //   if (productOptionValue) {
  //     //     // Обновляем существующую опцию
  //     //     productOptionValue.quantity = optionValueInput.quantity;
  //     //     productOptionValue.price = optionValueInput.price;
  //     //     await queryRunner.manager.save(productOptionValue);
  //     //   } else {
  //     //     // Создаем новую опцию
  //     //     productOptionValue = new ProductOptionValue();
  //     //     productOptionValue.product = product;
  //     //     productOptionValue.option = option;
  //     //     productOptionValue.value = value;
  //     //     productOptionValue.price = optionValueInput.price;
  //     //     productOptionValue.quantity = optionValueInput.quantity;

  //     //     await queryRunner.manager.save(productOptionValue);
  //     //   }
  //     // }
  //     console.warn('ОБНОВЛЯЕМ ОПЦИИ');

  //     for (const optionValueInput of payload.optionValues) {
  //       const option = await this.optionService.findOneOption(
  //         optionValueInput.optionId
  //       );
  //       const value = await this.optionService.findOneOptionValue(
  //         optionValueInput.valueId
  //       );

  //       if (!option || !value) {
  //         throw new Error('Не найдена опция или значение');
  //       }

  //       let productOptionValue = product.optionValues.find(
  //         (ov) => ov.option?.id === option.id && ov.value?.id === value.id
  //       );

  //       if (productOptionValue) {
  //         // Обновляем существующую опцию
  //         productOptionValue.quantity = optionValueInput.quantity;
  //         productOptionValue.price = optionValueInput.price;
  //         await queryRunner.manager.save(productOptionValue);
  //       } else {
  //         // Создаем новую опцию
  //         productOptionValue = new ProductOptionValue();
  //         productOptionValue.product = product;
  //         productOptionValue.option = option;
  //         productOptionValue.value = value;
  //         productOptionValue.price = optionValueInput.price;
  //         productOptionValue.quantity = optionValueInput.quantity;

  //         await queryRunner.manager.save(productOptionValue);
  //       }
  //     }

  //     // Фиксируем транзакцию
  //     await queryRunner.commitTransaction();

  //     // Получаем обновленный продукт с описанием и опциями
  //     const updatedProduct = await this.productRepository.findOne({
  //       where: { id1c: product.id1c },
  //       relations: ['description', 'optionValues'],
  //     });

  //     return updatedProduct || null;
  //   } catch (error) {
  //     console.error('Ошибка при обновлении продукта:', error.message);
  //     await queryRunner.rollbackTransaction();
  //     throw new Error('Ошибка при обновлении продукта');
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
