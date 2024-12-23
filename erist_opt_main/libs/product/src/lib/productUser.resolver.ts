import { Resolver, Args, Query } from '@nestjs/graphql';
import {
  ITransformedProducts,
  ProductsFilterInputDTO,
  TransformedProductDTO,
  TransformedProductsDTO,
} from '@erist-opt/shared';
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';
import { ProductUserService } from './productUser.service';

/**
 * Resolver для управления товарами пользовательскими
 * User
 */
// @UseGuards(JwtAuthGuard)
@Resolver(() => TransformedProductDTO)
export class ProductUserResolver {
  constructor(private readonly productService: ProductUserService) {}

  @Query(() => TransformedProductsDTO, {
    name: 'getProducts',
    description: 'Получить все продукты',
  })
  async products(
    @Args('categoryId', {
      description: 'Если нужен поиск по категориям (исключает mainCategoryId)',
      nullable: true,
      defaultValue: null,
    })
    categoryId: string,

    @Args('mainCategoryId', {
      description:
        'Если нужен поиск по главной категории (исключает categoryId)',
      nullable: true,
      defaultValue: null,
    })
    mainCategoryId: string,

    @Args('sortBy', {
      nullable: true,
      defaultValue: 'sortOrder',
      description: 'параметр сортировки по полю',
    })
    sortBy: string,

    @Args('sortOrder', {
      nullable: true,
      defaultValue: 'asc',
      description: 'параметр порядка сортировки',
    })
    sortOrder: string,

    @Args('offset', { defaultValue: 0, description: ' По умолчанию 0' })
    offset: number,

    @Args('limit', { defaultValue: 10000, description: 'По умолчанию 10000' })
    limit: number,

    @Args('filter', { nullable: true }) filter?: ProductsFilterInputDTO
  ): Promise<ITransformedProducts> {
    const { priceFrom, priceTo, name, colors, sizes } = filter || {};

    if (categoryId && mainCategoryId) {
      throw new BadRequestException(
        'Невозможно запросить по главной категории и сопутствующей'
      );
    }
    const products = await this.productService.findAllForUser(
      categoryId,
      mainCategoryId
    );
    let filterProducts = await this.productService.filterProducts(
      products,
      priceFrom,
      priceTo,
      name,
      colors,
      sizes
    );

    if (sortBy && sortOrder) {
      filterProducts = await this.productService.sortProducts(
        filterProducts,
        sortBy,
        sortOrder
      );
    }

    const filterProductsLenght = filterProducts.length;

    let startIndex = offset;
    let endIndex = limit;
    if (startIndex >= filterProductsLenght) {
      startIndex = 0;
    }
    if (endIndex >= filterProductsLenght || endIndex === 0) {
      endIndex = filterProductsLenght;
    }

    filterProducts = filterProducts.slice(startIndex, endIndex);

    const productsData: ITransformedProducts = {
      data: filterProducts,
      total: filterProductsLenght,
    };
    return productsData;
  }

  @Query(() => TransformedProductDTO, {
    name: 'getProductById',
    description: 'Получить продукт по ID',
  })
  async getProductById(
    @Args('id', { type: () => String }) id: string
  ): Promise<TransformedProductDTO> {
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }
    return product;
  }

  @Query(() => [TransformedProductDTO], {
    name: 'getNewProducts',
    description: 'Получить новинки',
  })
  async newProducts() {
    const products = await this.productService.findNewProductsForUser();
    return products;
  }

  @Query(() => [TransformedProductDTO], {
    name: 'getRandProducts',
    description: 'Получить 6 рандомных товарв',
  })
  async randProducts() {
    const products = await this.productService.findRandomProductsForUser();
    if (!products) {
      throw new BadRequestException('Невозможно запросить товары');
    }
    return products;
  }

  @Query(() => [TransformedProductDTO], {
    name: 'randProductsByCategory',
    description: 'Получить 12 рандомных товарв из категории',
  })
  async randProductsByCategory(
    @Args('productId', { type: () => String }) productId: string,
    @Args('mainCategory', { type: () => String }) mainCategory: string
  ) {
    const products =
      await this.productService.findRandomProductsForUserByCategory(
        mainCategory,
        productId
      );

    if (!products) {
      return null;
    }

    return products;
  }
}
