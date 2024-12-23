import {
  IProduct,
  IProductOptionValue,
  ITransformedProduct,
  Product,
  ProductOptionForUserDTO,
  ProductOptionValue,
  ProductOptionValueForUserDTO,
} from '@erist-opt/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, MoreThan, Not, Raw, Repository } from 'typeorm';
import { AppLoggerLoki } from '@erist-opt/logs';
import { ProductImageService } from './productImage.service';

@Injectable()
export class ProductUserService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductOptionValue)
    private readonly productOptionValueRepository: Repository<ProductOptionValue>,
    private readonly appLoggerLoki: AppLoggerLoki,
    private readonly productImageService: ProductImageService
  ) {}

  /**
   * Возвращает все продукты для поиска.
   * @returns {Promise<ITransformedProduct[]>} Промис с массивом объектов продуктов.
   *
   * Этот метод возвращает все продукты из базы данных вместе с их описанием и изображениями.
   */
  async findAllForSearch(): Promise<ITransformedProduct[]> {
    const whereConditions = {
      status: true,
    };

    const options: FindManyOptions<Product> = {
      where: whereConditions,
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
      ],
      order: { sortOrder: 'ASC' },
    };

    const products = await this.productRepository.find(options);
    const transformedProducts = await this.transformProducts(products);
    return transformedProducts;
    // return products;
  }

  /**
   * Возвращает все продукты для пользователя с фильтрацией по категории.
   * @param categoryId Идентификатор категории.
   * @param mainCategoryId Идентификатор основной категории.
   * @returns {Promise<ITransformedProduct[]>} Промис с массивом объектов продуктов.
   *
   * Этот метод возвращает все продукты из базы данных вместе с их описанием и изображениями,
   * фильтруя их по категории или основной категории, если они указаны.
   */
  async findAllForUser(
    categoryId: string | null,
    mainCategoryId: string | null
  ): Promise<ITransformedProduct[]> {
    const whereConditions: any = {
      status: true,
    };

    if (categoryId) {
      whereConditions.categories = Raw(
        (alias) => `${alias} LIKE '%${categoryId}%'`
      );
    }

    if (mainCategoryId) {
      whereConditions.maincategory = mainCategoryId;
    }

    const options: FindManyOptions<Product> = {
      where: whereConditions,
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
      ],
      order: { sortOrder: 'ASC' },
    };

    const products = await this.productRepository.find(options);
    const transformedProducts = await this.transformProducts(products);
    return transformedProducts;
  }

  async findAllForAdmin(
    categoryId: string | null,
    mainCategoryId: string | null
  ): Promise<ITransformedProduct[]> {
    const whereConditions: any = {};

    if (categoryId) {
      whereConditions.categories = Raw(
        (alias) => `${alias} LIKE '%${categoryId}%'`
      );
    }

    if (mainCategoryId) {
      whereConditions.maincategory = mainCategoryId;
    }

    const options: FindManyOptions<Product> = {
      where: whereConditions,
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
      ],
      order: { sortOrder: 'ASC' },
    };

    const products = await this.productRepository.find(options);
    const transformedProducts = await this.transformProducts(products);
    return transformedProducts;
  }

  /**
   * Возвращает продукты по указанным идентификаторам.
   * @param ids Массив идентификаторов продуктов.
   * @returns {Promise<IProduct[]>} Промис с массивом объектов продуктов.
   *
   * Этот метод возвращает продукты из базы данных по их идентификаторам.
   */
  async findByIds(ids: string[]): Promise<IProduct[]> {
    return this.productRepository.find({
      where: { id: In(ids) },
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
        'productsRelated',
        'otherColorsProducts',
      ],
    });
  }

  /**
   * Фильтрует продукты по указанным параметрам.
   * @param products Массив продуктов для фильтрации.
   * @param priceFrom Минимальная цена.
   * @param priceTo Максимальная цена.
   * @param name Название продукта.
   * @param colors Массив цветов.
   * @param sizes Массив размеров.
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
    sizes?: string[]
  ): Promise<ITransformedProduct[]> {
    return products.filter((product) => {
      let isValid = true;

      if (priceFrom && product.price < priceFrom) {
        isValid = false;
      }

      if (priceTo && product.price > priceTo) {
        isValid = false;
      }

      if (
        name &&
        !product.description.name.toLowerCase().includes(name.toLowerCase())
      ) {
        isValid = false;
      }

      if (colors && colors.length > 0) {
        const productColors = product.options
          .filter((option) => option.name === 'Цвет')
          .flatMap((option) =>
            option.values.map((value) => value.value.name.toLowerCase())
          );
        if (
          !colors.some((color) => productColors.includes(color.toLowerCase()))
        ) {
          isValid = false;
        }
      }

      if (sizes && sizes.length > 0) {
        const productSizes = product.options
          .filter((option) => option.name === 'Размер')
          .flatMap((option) =>
            option.values.map((value) => value.value.name.toLowerCase())
          );
        if (!sizes.some((size) => productSizes.includes(size.toLowerCase()))) {
          isValid = false;
        }
      }

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

      return 0;
    });
  }

  /**
   * Преобразует продукт в трансформированный объект продукта.
   * @param product Объект продукта для преобразования.
   * @returns {Promise<ITransformedProduct>} Промис с трансформированным объектом продукта.
   *
   * Этот метод преобразует продукт, добавляя к нему опции и значения опций.
   */

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
      relatedProducts = await this.getRelatedProducts(product.productsRelated);
    }

    // Получение товаров с другим цветом
    let otherColorsProducts: ITransformedProduct[] = [];
    if (product.otherColorsProducts?.length) {
      otherColorsProducts = await this.getOtherColorsProducts(
        product.otherColorsProducts
      );
    }

    return {
      ...product,
      options: optionsArray,
      productsRelated: relatedProducts,
      otherColorsProducts: otherColorsProducts,
    };
  }

  /**
   * Возвращает продукт по его идентификатору.
   * @param productId Идентификатор продукта.
   * @returns {Promise<ITransformedProduct>} Промис с объектом продукта.
   * @throws {NotFoundException} Если продукт не найден.
   *
   * Этот метод возвращает продукт из базы данных по его идентификатору.
   */
  async findOneById(productId: string): Promise<ITransformedProduct> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
        'productsRelated',
        'otherColorsProducts',
      ],
    });
    if (!product) {
      throw new NotFoundException(`Продукт с ID ${productId} не найден`);
    }

    const transformProduct = await this.transformProductUser(product);

    return transformProduct;
  }

  /**
   * Преобразует продукт в трансформированный объект для пользователя.
   * @param product Объект продукта для преобразования.
   * @returns {Promise<ITransformedProduct>} Промис с трансформированным объектом продукта.
   *
   * Этот метод преобразует продукт для пользователя, добавляя к нему опции и значения опций.
   */
  async transformProductUser(product: IProduct): Promise<ITransformedProduct> {
    // Создаем Map для группировки опций по id
    const optionsMap = new Map<string, ProductOptionForUserDTO>();

    product.optionValues.forEach((optionValue: IProductOptionValue) => {
      const optionId = optionValue.option.id;

      // Проверяем, есть ли уже такая опция в карте
      if (!optionsMap.has(optionId)) {
        // Создаем новую опцию и добавляем в карту
        const newOptionDTO = new ProductOptionForUserDTO(
          optionValue.option.id,
          optionValue.option.name,
          optionValue.option.type,
          []
        );
        optionsMap.set(optionId, newOptionDTO);
      }

      // Получаем текущую опцию из карты
      const optionDTO = optionsMap.get(optionId);

      // Проверяем наличие optionDTO перед добавлением значения
      if (optionDTO) {
        // Добавляем значение опции к текущей опции
        optionDTO.values.push(
          new ProductOptionValueForUserDTO(
            optionValue.id,
            optionValue.price,
            optionValue.quantity,
            optionValue.href,
            optionValue.option,
            optionValue.value
          )
        );
      }
    });

    // Преобразуем карту в массив опций
    const optionsArray = Array.from(optionsMap.values());

    // Получение связанных товаров
    let relatedProducts: ITransformedProduct[] = [];
    if (product.productsRelated?.length) {
      relatedProducts = await this.getRelatedProducts(product.productsRelated);
    }

    // Получение товаров с другим цветом
    let otherColorsProducts: ITransformedProduct[] = [];
    if (product.otherColorsProducts?.length) {
      otherColorsProducts = await this.getOtherColorsProducts(
        product.otherColorsProducts
      );
    }

    // Создаем объект TransformedProductDTO
    const transformedProduct: ITransformedProduct = {
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
      dateAdded: product.dateAdded,
      productsRelated: relatedProducts,
      otherColorsProducts: otherColorsProducts,
    };

    return transformedProduct;
  }

  /**
   * Преобразует массив продуктов в трансформированные объекты продуктов.
   * @param products Массив объектов продуктов для преобразования.
   * @returns {Promise<ITransformedProduct[]>} Промис с массивом трансформированных объектов продуктов.
   *
   * Этот метод преобразует массив продуктов, добавляя к ним опции и значения опций.
   */
  async transformProducts(
    products: IProduct[]
  ): Promise<ITransformedProduct[]> {
    return Promise.all(
      products.map((product) => this.transformProduct(product))
    );
  }

  /**
   * Возвращает значение опции продукта по идентификатору опции и продукта.
   * @param optionId Идентификатор опции.
   * @param productId Идентификатор продукта.
   * @returns {Promise<IProductOptionValue | null>} Промис с объектом значения опции продукта или null, если не найдено.
   *
   * Этот метод возвращает значение опции продукта по указанным идентификаторам опции и продукта.
   */
  async findOptionProductValue(
    optionId: string,
    productId: string
  ): Promise<IProductOptionValue | null> {
    const optionProductValue = await this.productOptionValueRepository.findOne({
      where: {
        product: { id: productId },
        option: { id: optionId },
      },
      relations: ['option', 'value'],
    });

    if (!optionProductValue) {
      return null;
    }

    return optionProductValue;
  }

  /**
   * Возвращает продукт по его идентификатору для корзины.
   * @param id Идентификатор продукта.
   * @returns {Promise<IProduct | null>} Промис с объектом продукта или null, если не найдено.
   *
   * Этот метод возвращает продукт из базы данных по его идентификатору для использования в корзине.
   */
  async findOneByIdForCart(id: string): Promise<IProduct | null> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['description', 'images'],
    });
    if (!product) {
      return null;
    }
    return product;
  }

  async findOptionIdByValue(id: string): Promise<string | null> {
    const option = await this.productOptionValueRepository.findOne({
      where: { id },
      relations: ['option'],
    });
    if (!option) {
      return null;
    }
    return option.option.id;
  }
  async findOptionById(id: string): Promise<IProductOptionValue | null> {
    const option = await this.productOptionValueRepository.findOne({
      where: { id },
    });
    if (!option) {
      return null;
    }
    return option;
  }

  async findOptionByProductAndValue(
    productId: string,
    valueId: string
  ): Promise<IProductOptionValue | null> {
    const option = await this.productOptionValueRepository.findOne({
      where: {
        product: { id: productId },
        value: { id: valueId },
      },
      relations: ['option', 'value'],
    });
    return option || null;
  }

  async findOptionByIdProductOpption(
    id: string
  ): Promise<IProductOptionValue | null> {
    const option = await this.productOptionValueRepository.findOne({
      where: { id },
      relations: ['value'],
    });
    if (!option) {
      return null;
    }
    return option;
  }

  /**
   * Возвращает  новых товаров на основе даты добавления.
   * @returns {Promise<ITransformedProduct[]>} Промис с массивом объектов продуктов.
   */
  async findNewProductsForUser(): Promise<ITransformedProduct[]> {
    const products = await this.productRepository.find({
      order: {
        dateAdded: 'DESC',
      },
      where: {
        status: true,
      },
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
      ],
    });
    const transformedProducts = await this.transformProducts(products);
    return transformedProducts;
  }

  /**
   * Возвращает 6 рандомных товаров с ценой больше 6000.
   * @returns {Promise<ITransformedProduct[]>} Промис с массивом объектов продуктов.
   */
  async findRandomProductsForUser(): Promise<ITransformedProduct[]> {
    const products = await this.productRepository.find({
      where: {
        price: MoreThan(6000),
        status: true,
      },
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
      ],
    });

    // Перемешать чтобы рандомно было
    const shuffledProducts = products.sort(() => 0.5 - Math.random());

    const randomProducts = shuffledProducts.slice(0, 11);

    const transformedProducts = await this.transformProducts(randomProducts);
    return transformedProducts;
  }

  /**
   * Возвращает 12 рандомных товаров с ценой больше 6000.
   * @returns {Promise<ITransformedProduct[]>} Промис с массивом объектов продуктов.
   */
  async findRandomProductsForUserByCategory(
    mainCategory: string,
    productId: string
  ): Promise<ITransformedProduct[]> {
    const products = await this.productRepository.find({
      where: {
        // price: MoreThan(6000),
        status: true,
        maincategory: mainCategory,
        id: Not(productId),
      },
      take: 15,
      relations: [
        'description',
        'images',
        'optionValues',
        'optionValues.option',
        'optionValues.value',
      ],
    });
    // Перемешать чтобы рандомно было
    const shuffledProducts = products.sort(() => 0.5 - Math.random());

    const randomProducts = shuffledProducts.slice(0, 11);

    const transformedProducts = await this.transformProducts(randomProducts);
    return transformedProducts;
  }

  async getProductsCount(): Promise<number> {
    const ordersCount = await this.productRepository.count();
    return ordersCount;
  }

  private async getRelatedProducts(
    relatedProductsData: { relatedProductId: string }[]
  ): Promise<ITransformedProduct[]> {
    const relatedProducts = await Promise.all(
      relatedProductsData.map(async (related) => {
        const relatedProduct = await this.productRepository.findOne({
          where: { id: related.relatedProductId },
          relations: [
            'description',
            'images',
            'optionValues',
            'optionValues.option',
            'optionValues.value',
          ],
        });
        if (relatedProduct && relatedProduct.status === true) {
          return this.transformProduct(relatedProduct as IProduct);
        }
        return undefined;
      })
    );

    return relatedProducts.filter(
      (relatedProduct): relatedProduct is ITransformedProduct =>
        relatedProduct !== undefined
    );
  }

  private async getOtherColorsProducts(
    otherColorsProductsData: { otherColorProductId: string }[]
  ): Promise<ITransformedProduct[]> {
    const otherColorsProducts = await Promise.all(
      otherColorsProductsData.map(async (product) => {
        const otherColorProduct = await this.productRepository.findOne({
          where: { id: product.otherColorProductId },
          relations: [
            'description',
            'images',
            'optionValues',
            'optionValues.option',
            'optionValues.value',
          ],
        });
        if (otherColorProduct) {
          return this.transformProduct(otherColorProduct as IProduct);
        }
        return undefined;
      })
    );

    return otherColorsProducts.filter(
      (product): product is ITransformedProduct => product !== undefined
    );
  }
}
