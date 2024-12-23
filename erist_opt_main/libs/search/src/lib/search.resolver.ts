import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { SearchService } from './search.service';
import {
  IProductsAndCategories,
  ProductsAndCategoriesDTO,
  SearchInputDTO,
} from '@erist-opt/shared';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';
import { v4 as uuidv4 } from 'uuid';

// @UseGuards(JwtAuthGuard)
@Resolver(() => ProductsAndCategoriesDTO)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => ProductsAndCategoriesDTO, {
    name: 'GetProductsAndCategories',
    description: 'Получить продукты и категории',
  })
  async getProductsAndCategories(
    @Args('searchInput') searchInput: SearchInputDTO,
    @Context() context: any
  ): Promise<ProductsAndCategoriesDTO | null> {
    const userContext = context.req.user;
    const data: IProductsAndCategories | null =
      await this.searchService.findProductsAndCategories();
    //uuidv4()
    console.warn(data);

    if (!data) {
      return null;
    }

    let filtredProductsAndCategories = data;

    if (searchInput.searchString !== null) {
      filtredProductsAndCategories =
        await this.searchService.filterProductsAndCategories(
          data,
          searchInput.searchString
        );
    }
    return {
      products: filtredProductsAndCategories.products,
      categories: filtredProductsAndCategories.categories,
    };
  }
}
