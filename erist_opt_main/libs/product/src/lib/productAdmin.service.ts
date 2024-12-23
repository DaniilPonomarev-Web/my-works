import { OptionService } from '@erist-opt/options';
import {
  InputCreateProductDTO,
  InputUpdateProductDTO,
  IProduct,
  ITransformedProduct,
  IUpdateProductQuantities,
  OtherColorProducts,
  Product,
  ProductDescription,
  ProductImage,
  ProductOptionValue,
  ProductsRelated,
} from '@erist-opt/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageService } from './productImage.service';

@Injectable()
export class ProductAdminService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductDescription)
    private productDescriptionRepository: Repository<ProductDescription>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductsRelated)
    private productRelated: Repository<ProductsRelated>,
    @InjectRepository(OtherColorProducts)
    private otherColorProducts: Repository<OtherColorProducts>,

    private readonly optionService: OptionService,
    private readonly productImageService: ProductImageService
  ) {}

  /**
   * Создает новый продукт с указанными данными.
   * @param input Данные для создания продукта.
   * @returns {Promise<IProduct>} Промис с объектом созданного продукта.
   *
   * Этот метод создает новую запись продукта в базе данных, а также создает его описание и изображения.
   */
  async createProduct(input: InputCreateProductDTO): Promise<IProduct | null> {
    const queryRunner =
      this.productRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Создаем продукт
      const product = this.productRepository.create({
        model: input.model,
        price: input.price,
        quantity: input.quantity,
        maincategory: input.maincategory,
        categories: input.categories,
        status: input.status,
        sortOrder: input.sortOrder,
      });

      // Сохраняем продукт
      await queryRunner.manager.save(product);

      // Создаем описание продукта
      const productDescription = this.productDescriptionRepository.create(
        input.description
      );

      // Сохраняем описание продукта
      const savedDescription = await queryRunner.manager.save(
        productDescription
      );

      // Связываем описание продукта с самим продуктом
      product.description = savedDescription;

      // Обновляем и сохраняем продукт с корректным descriptionId
      queryRunner.manager.save(product);

      // Создаем изображения продукта
      const productImages = await Promise.all(
        input.images.map(async (image) => {
          const newImageUrl = await this.productImageService.newImageUrl(
            image.imageNameMinio
          );
          return this.productImageRepository.create({
            productId: product.id,
            imageNameMinio: image.imageNameMinio,
            image: newImageUrl,
            sortOrder: image.sortOrder,
          });
        })
      );

      // Сохраняем изображения продукта
      await queryRunner.manager.save(productImages);

      // Создаем и сохраняем значения опций продукта
      for (const optionValueInput of input.optionValues) {
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
          productOptionValue.price = optionValueInput.price;
          productOptionValue.quantity = optionValueInput.quantity;

          // Сохраняем созданную ProductOptionValue
          await queryRunner.manager.save(productOptionValue);
        }
      }

      // Фиксируем транзакцию
      await queryRunner.commitTransaction();

      // Получаем сохраненный продукт с описанием, изображениями и опциями
      const savedProduct = await this.productRepository.findOne({
        where: { id: product.id },
        relations: [
          'description',
          'images',
          'optionValues',
          'optionValues.option',
          'optionValues.value',
          'productsRelated',
        ],
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
  }

  /**
   * Преобразует продукт в трансформированный объект продукта.
   * @param product Объект продукта для преобразования.
   * @returns {Promise<ITransformedProduct>} Промис с трансформированным объектом продукта.
   *
   * Этот метод преобразует продукт, добавляя к нему опции и значения опций.
   */
  // async transformProduct(product: IProduct): Promise<ITransformedProduct> {
  //   const optionsArray: any = product.optionValues.map((optionValue) => ({
  //     id: optionValue.option.id,
  //     name: optionValue.option.name,
  //     type: optionValue.option.type,
  //     values: [
  //       {
  //         id: optionValue.id,
  //         price: optionValue.price,
  //         quantity: optionValue.quantity,
  //         href: optionValue.href,
  //         option: {
  //           id: optionValue.option.id,
  //           name: optionValue.option.name,
  //           type: optionValue.option.type,
  //         },
  //         value: {
  //           id: optionValue.value.id,
  //           name: optionValue.value.name,
  //           sortOrder: optionValue.value.sortOrder,
  //         },
  //       },
  //     ],
  //   }));
  //   return {
  //     ...product,
  //     options: optionsArray,
  //   };
  // }
  async transformProduct(product: IProduct): Promise<ITransformedProduct> {
    const optionsArray: any = product.optionValues.map((optionValue) => ({
      id: optionValue.option.id,
      name: optionValue.option.name,
      type: optionValue.option.type,
      values: [
        {
          id: optionValue.id,
          price: optionValue.price,
          quantity: optionValue.quantity,
          href: optionValue.href,
          option: {
            id: optionValue.option.id,
            name: optionValue.option.name,
            type: optionValue.option.type,
          },
          value: {
            id: optionValue.value.id,
            name: optionValue.value.name,
            sortOrder: optionValue.value.sortOrder,
          },
        },
      ],
    }));

    // Получение связанных товаров
    let relatedProducts: ITransformedProduct[] = [];
    if (product.productsRelated?.length) {
      relatedProducts = (
        await Promise.all(
          product.productsRelated.map(async (related) => {
            const relatedProduct = await this.productRepository.findOne({
              where: { id: related.relatedProductId },
              relations: [
                'description',
                'images',
                'optionValues',
                'optionValues.option',
                'optionValues.value',
                'productsRelated',
              ],
            });
            if (relatedProduct) {
              return this.transformProduct(relatedProduct as IProduct);
            }
            return undefined;
          })
        )
      ).filter(
        (relatedProduct): relatedProduct is ITransformedProduct =>
          relatedProduct !== undefined
      ); // Фильтруем `undefined` элементы
    }

    // Получение  товаров c другими цветами
    let otherColorProducts: ITransformedProduct[] = [];
    if (product.otherColorsProducts?.length) {
      otherColorProducts = (
        await Promise.all(
          product.otherColorsProducts.map(async (product) => {
            const otherColorsProduct = await this.productRepository.findOne({
              where: { id: product.otherColorProductId },
              relations: [
                'description',
                'images',
                'optionValues',
                'optionValues.option',
                'optionValues.value',
                'otherColorsProducts',
              ],
            });
            if (otherColorsProduct) {
              return this.transformProduct(otherColorsProduct as IProduct);
            }
            return undefined;
          })
        )
      ).filter(
        (otherColorsProduct): otherColorsProduct is ITransformedProduct =>
          otherColorsProduct !== undefined
      ); // Фильтруем `undefined` элементы
    }

    return {
      id: product.id,
      id1c: product.id1c,
      model: product.model,
      price: product.price,
      quantity: product.quantity,
      maincategory: product.maincategory,
      hrefCloudPhotos: product.hrefCloudPhotos,
      categories: product.categories,
      status: product.status,
      sortOrder: product.sortOrder,
      description: product.description,
      images: product.images,
      options: optionsArray,
      productsRelated: relatedProducts,
      otherColorsProducts: otherColorProducts,
      dateAdded: product.dateAdded,
    };
  }

  /**
   * Фильтрует продукты по указанным параметрам.
   * @param products Массив продуктов для фильтрации.
   * @param priceFrom Минимальная цена.
   * @param priceTo Максимальная цена.
   * @param name Название продукта.
   * @param colors Массив цветов.
   * @param sizes Массив размеров.
   * @param mainCategoryId Главная категория.
   * @param categoryId Состоит в категории.
   * @returns {Promise<ITransformedProduct[]>} Промис с отфильтрованным массивом продуктов.
   *
   * Этот метод фильтрует продукты по цене, названию, цветам и размерам.
   */
  async filterProducts(
    products: ITransformedProduct[],
    priceFrom?: number,
    priceTo?: number,
    name?: string,
    colors?: string[],
    sizes?: string[],
    mainCategoryId?: string,
    categoryId?: string
  ): Promise<ITransformedProduct[]> {
    return products.filter((product) => {
      let isValid = true;

      // Фильтрация по цене
      if (
        priceFrom !== null &&
        priceFrom !== undefined &&
        product.price < priceFrom
      ) {
        isValid = false;
      }

      if (
        priceTo !== null &&
        priceTo !== undefined &&
        product.price > priceTo
      ) {
        isValid = false;
      }

      // Фильтрация по названию
      if (
        name !== null &&
        name !== undefined &&
        name &&
        !product.description.name.toLowerCase().includes(name.toLowerCase())
      ) {
        isValid = false;
      }

      // Фильтрация по главной категории
      if (
        mainCategoryId !== null &&
        mainCategoryId !== undefined &&
        mainCategoryId &&
        product.maincategory.toLowerCase() !== mainCategoryId.toLowerCase()
      ) {
        isValid = false;
      }

      // Фильтрация по категории
      if (
        categoryId !== null &&
        categoryId !== undefined &&
        categoryId &&
        !product.categories.includes(categoryId)
      ) {
        isValid = false;
      }

      // Фильтрация по цветам
      // if (colors && colors.length > 0) {
      //   const productColors = product.options
      //     .filter((option) => option.name === 'Цвет')
      //     .flatMap((option) =>
      //       option.values.map((value) => value.value.name.toLowerCase())
      //     );

      //   if (
      //     !colors.some((color) => productColors.includes(color.toLowerCase()))
      //   ) {
      //     isValid = false;
      //   }
      // }

      // Фильтрация по размерам
      // if (sizes && sizes.length > 0) {
      //   const productSizes = product.options
      //     .filter((option) => option.name === 'Размер')
      //     .flatMap((option) =>
      //       option.values.map((value) => value.value.name.toLowerCase())
      //     );

      //   if (!sizes.some((size) => productSizes.includes(size.toLowerCase()))) {
      //     isValid = false;
      //   }
      // }

      return isValid;
    });
  }

  /**
   * Сортирует продукты по указанным параметрам.
   * @param products Массив продуктов для сортировки.
   * @param sortBy Поле для сортировки.
   * @param sortOrder Порядок сортировки ('asc' или 'desc').
   * @returns {Promise<ITransformedProduct[]>} Промис с отсортированным массивом продуктов.
   *
   * Этот метод сортирует продукты по дате добавления, названию, количеству или цене.
   */
  async sortProducts(
    products: ITransformedProduct[],
    sortBy: string,
    sortOrder: string
  ): Promise<ITransformedProduct[]> {
    return products.sort((a: ITransformedProduct, b: ITransformedProduct) => {
      if (sortBy === 'dateAdded') {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);

        if (sortOrder === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else if (sortOrder === 'desc') {
          return dateB.getTime() - dateA.getTime();
        }
      }

      if (sortBy === 'name') {
        const nameA = a.description.name.toLowerCase();
        const nameB = b.description.name.toLowerCase();
        // console.warn(nameA + ' сравнивается с ' + nameB);

        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else if (sortOrder === 'desc') {
          return nameB.localeCompare(nameA);
        }
      }

      if (sortBy === 'quantity' || sortBy === 'price') {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (sortOrder === 'asc') {
          return valueA - valueB;
        } else if (sortOrder === 'desc') {
          return valueB - valueA;
        }
      }

      if (sortBy === 'sortOrder') {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (sortOrder === 'asc') {
          return valueA - valueB;
        } else if (sortOrder === 'desc') {
          return valueB - valueA;
        }
      }

      return 0;
    });
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
   * Обновляет существующий продукт с указанными данными.
   * @param input Данные для обновления продукта.
   * @returns {Promise<IProduct | null>} Промис с обновленным продуктом.
   *
   * Этот метод обновляет запись продукта в базе данных, а также обновляет его описание, изображения и опции.
   */
  // async updateProduct(input: InputUpdateProductDTO): Promise<IProduct | null> {
  //   console.warn('updateProduct', input);

  //   const queryRunner =
  //     this.productRepository.manager.connection.createQueryRunner();
  //   await queryRunner.startTransaction();

  //   try {
  //     // Находим существующий продукт
  //     const product = await queryRunner.manager.findOne(Product, {
  //       where: { id: input.id },
  //       relations: [
  //         'description',
  //         'images',
  //         'optionValues',
  //         'optionValues.option',
  //         'optionValues.value',
  //         'productsRelated',
  //       ],
  //     });

  //     if (!product) {
  //       throw new Error('Продукт не найден');
  //     }

  //     // Обновляем информацию о продукте
  //     product.maincategory = input.maincategory || product.maincategory;
  //     product.categories = input.categories || product.categories;
  //     product.hrefCloudPhotos = input.hrefCloudPhotos || '';
  //     // product.status = product.status; //|| product.status
  //     product.sortOrder = input.sortOrder || product.sortOrder;

  //     await queryRunner.manager.save(product);

  //     // Обновляем описание продукта
  //     if (input.description) {
  //       product.description = await this.productDescriptionRepository.save(
  //         this.productDescriptionRepository.merge(
  //           product.description,
  //           input.description
  //         )
  //       );
  //     }

  //     // Обновляем изображения продукта
  //     if (input.images.length > 0) {
  //       await queryRunner.manager.delete(ProductImage, {
  //         productId: product.id,
  //       }); // Удаляем старые изображения
  //       const productImages = await Promise.all(
  //         input.images.map(async (image) => {
  //           const newImageUrl = await this.productImageService.newImageUrl(
  //             image.imageNameMinio
  //           );
  //           return this.productImageRepository.create({
  //             productId: product.id,
  //             imageNameMinio: image.imageNameMinio,
  //             image: newImageUrl,
  //             sortOrder: image.sortOrder,
  //           });
  //         })
  //       );
  //       await queryRunner.manager.save(productImages);
  //     }

  //     // Обработка опций
  //     if (input.optionValues) {
  //       // Находим существующие опции для продукта
  //       const existingOptionValues = await queryRunner.manager.find(
  //         ProductOptionValue,
  //         {
  //           where: { product: { id: product.id } },
  //           relations: ['option', 'value'],
  //         }
  //       );

  //       const existingOptionValueMap = new Map<string, ProductOptionValue>();
  //       existingOptionValues.forEach((ov) =>
  //         existingOptionValueMap.set(`${ov.option.id}-${ov.value.id}`, ov)
  //       );

  //       const newOptionValueMap = new Map<string, any>();
  //       input.optionValues.forEach((optionValue) =>
  //         newOptionValueMap.set(
  //           `${optionValue.optionId}-${optionValue.valueId}`,
  //           optionValue
  //         )
  //       );

  //       // Удаляем опции, которые больше не включены
  //       for (const [key, existingOptionValue] of existingOptionValueMap) {
  //         if (!newOptionValueMap.has(key)) {
  //           await queryRunner.manager.delete(
  //             ProductOptionValue,
  //             existingOptionValue.id
  //           );
  //         }
  //       }

  //       // Обновляем или добавляем новые опции
  //       for (const [key, newOptionValueInput] of newOptionValueMap) {
  //         const existingOptionValue = existingOptionValueMap.get(key);

  //         const option = await this.optionService.findOneOption(
  //           newOptionValueInput.optionId
  //         );
  //         const value = await this.optionService.findOneOptionValue(
  //           newOptionValueInput.valueId
  //         );

  //         if (!value || !option) {
  //           throw new Error('Не найдена опция или значение');
  //         }

  //         if (existingOptionValue) {
  //           // Обновляем существующую опцию
  //           existingOptionValue.price = newOptionValueInput.price;
  //           existingOptionValue.href = newOptionValueInput.href;
  //           existingOptionValue.quantity = newOptionValueInput.quantity;
  //           await queryRunner.manager.save(existingOptionValue);
  //         } else {
  //           // Создаем новую опцию
  //           const productOptionValue = new ProductOptionValue();
  //           productOptionValue.product = product;
  //           productOptionValue.option = option;
  //           productOptionValue.value = value;
  //           productOptionValue.price = newOptionValueInput.price;
  //           productOptionValue.quantity = newOptionValueInput.quantity;
  //           productOptionValue.href = newOptionValueInput.href;

  //           await queryRunner.manager.save(productOptionValue);
  //         }
  //       }
  //     }

  //     if (input.relatedProductsIds) {
  //       // Получаем текущие связанные товары
  //       const existingRelations = await queryRunner.manager.find(
  //         ProductsRelated,
  //         {
  //           where: { product: { id: product.id } },
  //         }
  //       );

  //       const currentRelatedIds = new Set(
  //         existingRelations.map((relation) => relation.relatedProductId)
  //       );
  //       const newRelatedIds = new Set(input.relatedProductsIds);

  //       // Находим ID для удаления (удаленные связи)
  //       const idsToRemove = [...currentRelatedIds].filter(
  //         (id) => !newRelatedIds.has(id)
  //       );

  //       // Находим ID для добавления (новые связи)
  //       const idsToAdd = [...newRelatedIds].filter(
  //         (id) => !currentRelatedIds.has(id)
  //       );

  //       // Удаляем старые связи
  //       for (const idToRemove of idsToRemove) {
  //         // Удаляем прямую связь
  //         await queryRunner.manager.delete(ProductsRelated, {
  //           product: { id: product.id },
  //           relatedProductId: idToRemove,
  //         });

  //         // Удаляем обратную связь
  //         await queryRunner.manager.delete(ProductsRelated, {
  //           product: { id: idToRemove },
  //           relatedProductId: product.id,
  //         });
  //       }

  //       // Добавляем новые связи
  //       const relatedProducts: ProductsRelated[] = [];
  //       for (const idToAdd of idsToAdd) {
  //         const relatedProduct = await queryRunner.manager.findOne(Product, {
  //           where: { id: idToAdd }, //status: true
  //         });

  //         if (relatedProduct) {
  //           // Прямая связь
  //           const productsRelated = new ProductsRelated();
  //           productsRelated.product = product;
  //           productsRelated.relatedProductId = idToAdd;
  //           relatedProducts.push(productsRelated);

  //           // Проверяем и добавляем обратную связь
  //           const reverseRelation = new ProductsRelated();
  //           reverseRelation.product = relatedProduct;
  //           reverseRelation.relatedProductId = product.id;
  //           relatedProducts.push(reverseRelation);
  //         }
  //       }

  //       // Сохраняем все новые связи
  //       if (relatedProducts.length > 0) {
  //         await queryRunner.manager.save(relatedProducts);
  //       }
  //     }

  //     // Фиксируем транзакцию
  //     await queryRunner.commitTransaction();

  //     // Получаем обновленный продукт
  //     const updatedProduct = await this.productRepository.findOne({
  //       where: { id: product.id },
  //       relations: [
  //         'description',
  //         'images',
  //         'optionValues',
  //         'optionValues.option',
  //         'optionValues.value',
  //         'productsRelated',
  //       ],
  //     });

  //     if (!updatedProduct) {
  //       return null;
  //     }

  //     return updatedProduct;
  //   } catch (error) {
  //     console.error('Ошибка при обновлении продукта:', error);
  //     await queryRunner.rollbackTransaction();
  //     throw new Error('Ошибка при обновлении продукта');
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
  async updateProduct(input: InputUpdateProductDTO): Promise<IProduct | null> {
    const queryRunner =
      this.productRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Находим существующий продукт
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: input.id },
        relations: [
          'description',
          'images',
          'optionValues',
          'optionValues.option',
          'optionValues.value',
          'productsRelated',
        ],
      });

      if (!product) {
        throw new Error('Продукт не найден');
      }

      // Обновляем основные поля продукта
      Object.assign(product, {
        maincategory: input.maincategory || product.maincategory,
        categories: input.categories || product.categories,
        hrefCloudPhotos: input.hrefCloudPhotos || '',
        sortOrder: input.sortOrder || product.sortOrder,
      });

      await queryRunner.manager.save(product);

      // Обновляем описание продукта
      if (input.description) {
        product.description = await this.productDescriptionRepository.save(
          this.productDescriptionRepository.merge(
            product.description,
            input.description
          )
        );
      }

      // Обновляем изображения продукта
      if (input.images.length > 0) {
        await queryRunner.manager.delete(ProductImage, {
          productId: product.id,
        }); // Удаляем старые изображения
        const productImages = await Promise.all(
          input.images.map(async (image) => {
            const newImageUrl = await this.productImageService.newImageUrl(
              image.imageNameMinio
            );
            return this.productImageRepository.create({
              productId: product.id,
              imageNameMinio: image.imageNameMinio,
              image: newImageUrl,
              sortOrder: image.sortOrder,
            });
          })
        );
        await queryRunner.manager.save(productImages);
      }

      // Обработка опций
      if (input.optionValues) {
        const existingOptionValues = await queryRunner.manager.find(
          ProductOptionValue,
          {
            where: { product: { id: product.id } },
            relations: ['option', 'value'],
          }
        );

        const existingOptionValueMap = new Map<string, ProductOptionValue>();
        existingOptionValues.forEach((ov) =>
          existingOptionValueMap.set(`${ov.option.id}-${ov.value.id}`, ov)
        );

        const newOptionValueMap = new Map<string, any>();
        input.optionValues.forEach((optionValue) =>
          newOptionValueMap.set(
            `${optionValue.optionId}-${optionValue.valueId}`,
            optionValue
          )
        );

        // Удаление старых опций
        for (const [key, existingOptionValue] of existingOptionValueMap) {
          if (!newOptionValueMap.has(key)) {
            await queryRunner.manager.delete(
              ProductOptionValue,
              existingOptionValue.id
            );
          }
        }

        // Обновление или добавление новых опций
        for (const [key, newOptionValueInput] of newOptionValueMap) {
          const existingOptionValue = existingOptionValueMap.get(key);
          const option = await this.optionService.findOneOption(
            newOptionValueInput.optionId
          );
          const value = await this.optionService.findOneOptionValue(
            newOptionValueInput.valueId
          );

          if (!value || !option) {
            throw new Error('Не найдена опция или значение');
          }

          if (existingOptionValue) {
            Object.assign(existingOptionValue, {
              price: newOptionValueInput.price,
              href: newOptionValueInput.href,
              quantity: newOptionValueInput.quantity,
            });
            await queryRunner.manager.save(existingOptionValue);
          } else {
            const productOptionValue = new ProductOptionValue();
            Object.assign(productOptionValue, {
              product,
              option,
              value,
              price: newOptionValueInput.price,
              quantity: newOptionValueInput.quantity,
              href: newOptionValueInput.href,
            });
            await queryRunner.manager.save(productOptionValue);
          }
        }
      }

      // Удаление связей relatedProducts
      if (
        input.relatedProductsIds === null ||
        input.relatedProductsIds.length === 0
      ) {
        // Удаляем все связи, где данный товар является основным
        await queryRunner.manager.delete(ProductsRelated, {
          product: { id: product.id },
        });

        // Удаляем все обратные связи, где данный товар является связанной записью
        await queryRunner.manager.delete(ProductsRelated, {
          relatedProductId: product.id,
        });
      }
      if (input.relatedProductsIds) {
        // Получаем текущие связи для данного товара
        const existingRelations = await queryRunner.manager.find(
          ProductsRelated,
          {
            where: { product: { id: product.id } },
          }
        );

        const currentRelatedIds = new Set(
          existingRelations.map((relation) => relation.relatedProductId)
        );
        const newRelatedIds = new Set(input.relatedProductsIds);

        // Удаляем старые связи
        for (const idToRemove of [...currentRelatedIds].filter(
          (id) => !newRelatedIds.has(id)
        )) {
          // Удаляем связь product -> relatedProduct
          await queryRunner.manager.delete(ProductsRelated, {
            product: { id: product.id },
            relatedProductId: idToRemove,
          });

          // Удаляем обратную связь relatedProduct -> product
          await queryRunner.manager.delete(ProductsRelated, {
            product: { id: idToRemove },
            relatedProductId: product.id,
          });
        }

        // Собираем список всех связанных товаров, включая текущий
        const allIds = new Set([...newRelatedIds, product.id]);

        // Добавляем новые связи и создаем двунаправленные связи
        for (const id1 of allIds) {
          for (const id2 of allIds) {
            if (id1 !== id2) {
              const existingRelation = await queryRunner.manager.findOne(
                ProductsRelated,
                {
                  where: {
                    product: { id: id1 },
                    relatedProductId: id2,
                  },
                }
              );

              // Добавляем связь только если её нет
              if (!existingRelation) {
                await queryRunner.manager.save(ProductsRelated, {
                  product: { id: id1 },
                  relatedProductId: id2,
                });
              }
            }
          }
        }
      }

      if (
        input.otherColorsProductsIds === null ||
        input.otherColorsProductsIds.length === 0
      ) {
        // Удаляем все связи, где данный товар является основным
        await queryRunner.manager.delete(OtherColorProducts, {
          product: { id: product.id },
        });

        // Удаляем все обратные связи, где данный товар является связанной записью
        await queryRunner.manager.delete(OtherColorProducts, {
          otherColorProductId: product.id,
        });
      }
      if (input.otherColorsProductsIds) {
        // Получаем текущие связи для данного товара
        const existingOtherColorRelations = await queryRunner.manager.find(
          OtherColorProducts,
          {
            where: { product: { id: product.id } },
          }
        );

        const currentIds = new Set(
          existingOtherColorRelations.map(
            (relation) => relation.otherColorProductId
          )
        );
        const newIds = new Set(input.otherColorsProductsIds);

        // Удаляем старые связи
        for (const idToRemove of [...currentIds].filter(
          (id) => !newIds.has(id)
        )) {
          // Удаляем связь product -> otherColorProduct
          await queryRunner.manager.delete(OtherColorProducts, {
            product: { id: product.id },
            otherColorProductId: idToRemove,
          });

          // Удаляем обратную связь otherColorProduct -> product
          await queryRunner.manager.delete(OtherColorProducts, {
            product: { id: idToRemove },
            otherColorProductId: product.id,
          });
        }

        // Собираем список всех связанных товаров, включая текущий
        const allIds = new Set([...newIds, product.id]);

        // Добавляем новые связи и создаем двунаправленные связи
        for (const id1 of allIds) {
          for (const id2 of allIds) {
            if (id1 !== id2) {
              const existingRelation = await queryRunner.manager.findOne(
                OtherColorProducts,
                {
                  where: {
                    product: { id: id1 },
                    otherColorProductId: id2,
                  },
                }
              );

              // Добавляем связь только если её нет
              if (!existingRelation) {
                await queryRunner.manager.save(OtherColorProducts, {
                  product: { id: id1 },
                  otherColorProductId: id2,
                });
              }
            }
          }
        }
      }

      await queryRunner.commitTransaction();

      const updatedProduct = await this.productRepository.findOne({
        where: { id: product.id },
        relations: [
          'description',
          'images',
          'optionValues',
          'optionValues.option',
          'optionValues.value',
        ],
      });

      return updatedProduct;
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      await queryRunner.rollbackTransaction();
      throw new Error('Ошибка при обновлении продукта');
    } finally {
      await queryRunner.release();
    }
  }
}
