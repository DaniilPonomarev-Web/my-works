import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductDescriptionDTO } from './product_description.dto';
import { ProductImageDTO } from './product_image.dto';
import { IProducts, IProduct, IProductRelated } from '../../interfaces';
import { ProductOptionValueDTO } from './product-options.dto';
import { ProductRelatedDTO } from './product-relateds.dto';
import { OtherColorProductDTO } from './product-other-color.dto';

@ObjectType({ description: 'Продукт' })
export class ProductDTO implements IProduct {
  @Field(() => ID, { description: 'ID продукта' })
  id: string;

  @Field(() => String, { description: 'ID продукта в 1сфизи' })
  id1c: string;

  @Field({ description: 'Модель продукта' })
  model: string;

  @Field({ description: 'Цена продукта' })
  price: number;

  @Field({ description: 'Количество продукта' })
  quantity: number;

  @Field({ description: 'Главная категория' })
  maincategory: string;

  @Field({ description: 'Ссылка на облако', nullable: true })
  hrefCloudPhotos: string;

  @Field(() => [String], { description: 'Категории продукта' })
  categories: string[];

  @Field({ description: 'Статус продукта' })
  status: boolean;

  @Field({ description: 'Порядок сортировки' })
  sortOrder: number;

  @Field(() => ProductDescriptionDTO, { description: 'Описание продукта' })
  description: ProductDescriptionDTO;

  @Field(() => [ProductImageDTO], {
    description: 'Изображения продукта',
    nullable: true,
  })
  images: ProductImageDTO[];

  @Field(() => [ProductOptionValueDTO], {
    description: 'Опции продукта',
    nullable: false,
  })
  optionValues: ProductOptionValueDTO[];

  @Field(() => Date, {
    description: 'Дата добавления',
    nullable: true,
  })
  dateAdded: Date;

  @Field(() => [ProductRelatedDTO], { description: 'Связанные товары' })
  productsRelated: ProductRelatedDTO[];

  @Field(() => [OtherColorProductDTO], {
    description: 'Товары с другим цветом',
  })
  otherColorsProducts: OtherColorProductDTO[];

  constructor(
    id: string,
    model: string,
    price: number,
    quantity: number,
    maincategory: string,
    hrefCloudPhotos: string,
    categories: string[],
    status: boolean,
    sortOrder: number,
    description: ProductDescriptionDTO,
    images: ProductImageDTO[],
    optionValues: ProductOptionValueDTO[],
    dateAdded: Date,
    productsRelated: ProductRelatedDTO[],
    otherColorsProducts: OtherColorProductDTO[]
  ) {
    this.id = id;
    this.model = model;
    this.price = price;
    this.quantity = quantity;
    this.maincategory = maincategory;
    this.hrefCloudPhotos = hrefCloudPhotos;
    this.categories = categories;
    this.status = status;
    this.sortOrder = sortOrder;
    this.description = description;
    this.images = images;
    this.optionValues = optionValues;
    this.dateAdded = dateAdded;
    this.productsRelated = productsRelated;
    this.otherColorsProducts = otherColorsProducts;
  }
}

@ObjectType({ description: 'Продукты для фронта' })
export class ProductsDTO implements IProducts {
  @Field(() => [ProductDTO], {
    description: 'Товары',
    nullable: true,
  })
  data: ProductDTO[];

  @Field(() => Number, {
    description: 'Общее количество товаров',
    nullable: false,
  })
  total: number;

  constructor(data: ProductDTO[], total: number) {
    this.data = data;
    this.total = total;
  }
}

/**

@ObjectType()
export class ProductForCardDTO implements IProductForCard {
  @Field(() => ID, { description: 'ID продукта' })
  id: string;

  @Field({ description: 'Модель продукта' })
  model: string;

  @Field({ description: 'Цена продукта' })
  price: number;

  @Field({ description: 'Количество продукта' })
  quantity: number;

  @Field({ description: 'Главная категория' })
  maincategory: string;

  @Field(() => [String], { description: 'Категории продукта' })
  categories: string[];

  @Field({ description: 'Статус продукта' })
  status: boolean;

  @Field({ description: 'Порядок сортировки' })
  sortOrder: number;

  @Field(() => ProductDescriptionDTO, { description: 'Описание продукта' })
  description: ProductDescriptionDTO;

  @Field(() => [ProductImageDTO], { description: 'Изображения продукта' })
  images: ProductImageDTO[];

  @Field(() => Date, {
    description: 'Дата добавления',
    nullable: true,
  })
  dateAdded: Date;

  @Field(() => String, {
    description: 'Имя опции',
    nullable: true,
  })
  optionName: string;

  constructor(
    id: string,
    model: string,
    price: number,
    quantity: number,
    maincategory: string,
    categories: string[],
    status: boolean,
    sortOrder: number,
    description: ProductDescriptionDTO,
    images: ProductImageDTO[],
    dateAdded: Date,
    optionName: string
  ) {
    this.id = id;
    this.model = model;
    this.price = price;
    this.quantity = quantity;
    this.maincategory = maincategory;
    this.categories = categories;
    this.status = status;
    this.sortOrder = sortOrder;
    this.description = description;
    this.images = images;
    this.dateAdded = dateAdded;
    this.optionName = optionName;
  }
}

 */
