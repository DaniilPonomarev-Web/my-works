import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductDescriptionDTO } from './product_description.dto';
import { ProductImageDTO } from './product_image.dto';
import { ProductOptionDTO } from './product-options.dto';
import { ITransformedProduct, ITransformedProducts } from '../../interfaces';

@ObjectType({ description: 'Продукты' })
export class TransformedProductsDTO implements ITransformedProducts {
  @Field(() => [TransformedProductDTO], {
    description: 'Товары',
    nullable: true,
  })
  data: TransformedProductDTO[];

  @Field(() => Number, {
    description: 'Общее количество товаров',
    nullable: false,
  })
  total: number;

  constructor(data: TransformedProductDTO[], total: number) {
    this.data = data;
    this.total = total;
  }
}

@ObjectType({ description: 'Трансформированный продукт' })
export class TransformedProductDTO implements ITransformedProduct {
  @Field(() => ID, { description: 'ID продукта' })
  id: string;

  @Field(() => String, { description: 'ID продукта' })
  id1c: string;

  @Field({ description: 'Модель продукта' })
  model: string;

  @Field({ description: 'Цена продукта' })
  price: number;

  @Field({ description: 'Количество продукта' })
  quantity: number;

  @Field({ description: 'Главная категория' })
  maincategory: string;

  @Field(() => String, { description: 'Ссылка на облако', nullable: true })
  hrefCloudPhotos: string;

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

  @Field(() => [ProductOptionDTO], {
    description: 'Опции продукта',
    nullable: false,
  })
  options: ProductOptionDTO[];

  @Field(() => [TransformedProductDTO], {
    nullable: true,
    description: 'Товары связанные',
  })
  productsRelated: TransformedProductDTO[];

  @Field(() => [TransformedProductDTO], {
    nullable: true,
    description: 'Товары c другими цветами',
  })
  otherColorsProducts: TransformedProductDTO[];

  @Field(() => Date, {
    description: 'Дата добавления',
    nullable: true,
  })
  dateAdded: Date;

  constructor(
    id: string,
    id1c: string,
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
    options: ProductOptionDTO[], // Используется новый DTO для опций
    dateAdded: Date,
    productsRelated: TransformedProductDTO[],
    otherColorsProducts: TransformedProductDTO[]
  ) {
    this.id = id;
    this.id1c = id1c;
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
    this.options = options; // Используется новый DTO для опций
    this.dateAdded = dateAdded;
    this.productsRelated = productsRelated;
    this.otherColorsProducts = otherColorsProducts;
  }
}
