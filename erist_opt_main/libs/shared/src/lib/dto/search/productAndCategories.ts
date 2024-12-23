import { IsOptional } from 'class-validator';
import { IProductsAndCategories } from '../../interfaces';
import { CategoryDTO } from '../category';
import { TransformedProductDTO } from '../product';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Продукты и категории' })
export class ProductsAndCategoriesDTO implements IProductsAndCategories {
  @Field(() => [TransformedProductDTO], {
    nullable: true,
    description: 'Товары',
  })
  products: TransformedProductDTO[];

  @Field(() => [CategoryDTO], { nullable: true, description: 'Категории' })
  categories: CategoryDTO[];

  constructor(products: TransformedProductDTO[], categories: CategoryDTO[]) {
    this.products = products;
    this.categories = categories;
  }
}

@InputType({ description: 'Передаем строку для поиска' })
export class SearchInputDTO {
  @IsOptional()
  @Field({
    description:
      'Строка с названием либо товара, либо категории. первый раз закинуть null',
    defaultValue: null,
    nullable: true,
  })
  searchString: string;

  constructor(searchString: string) {
    this.searchString = searchString;
  }
}
