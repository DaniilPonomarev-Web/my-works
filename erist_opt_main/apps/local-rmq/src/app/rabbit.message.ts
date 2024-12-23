import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitLocalService } from './rabbit.local.service';
import {
  GET_CATEGORIES_SEARCH,
  GET_PRODUCTS_SEARCH,
  ICategory,
  ITransformedProduct,
} from '@erist-opt/shared';
import { ProductUserService } from '@erist-opt/product';
import { CategoryAdminService, CategoryUserService } from '@erist-opt/category';

@Controller()
export class RmqMessagePattern {
  constructor(
    // private readonly rabbitLocalService: RabbitLocalService,
    private readonly productService: ProductUserService,
    private readonly categoryUserService: CategoryUserService
  ) // private readonly categoryAdminService: CategoryAdminService
  {}

  @MessagePattern({ cmd: GET_PRODUCTS_SEARCH })
  async getProductsForSearch(): Promise<ITransformedProduct[] | null> {
    const result = await this.productService.findAllForSearch();

    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: GET_CATEGORIES_SEARCH })
  async getCategoriesForSearch(): Promise<ICategory[]> {
    const result = await this.categoryUserService.getAllCategories();

    if (!result) {
      return null;
    }
    return result;
  }
}
