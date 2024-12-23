import { InputType, Field, Float, ID } from '@nestjs/graphql';
import {
  IInputCreateProduct,
  IInputCreateProductDescription,
  IInputCreateProductImage,
} from '../../interfaces';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';
import { Type } from 'class-transformer';

@InputType({ description: 'Входные данные для создания изображения продукта' })
export class InputCreateProductImageDTO implements IInputCreateProductImage {
  // @Length(1, 100, {
  //   message: HttpExceptionMessagesGraphQL.validationProduct.image.length,
  // })
  // @Field({ description: 'URL изображения', nullable: true })
  // image: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.image.not,
  })
  @Length(1, 100, {
    message: HttpExceptionMessagesGraphQL.validationProduct.image.length,
  })
  @Field({ description: 'Название изображения в Minio', nullable: false })
  imageNameMinio: string;

  @IsNumber(
    {},
    {
      message: HttpExceptionMessagesGraphQL.validationProduct.errorCharter,
    }
  )
  @Field({ description: 'Порядок сортировки', nullable: false })
  sortOrder: number;
  constructor(imageNameMinio: string, sortOrder: number) {
    this.imageNameMinio = imageNameMinio;
    this.sortOrder = sortOrder;
  }
}

@InputType({ description: 'Входные данные для создания описания продукта' })
export class InputCreateProductDescriptionDTO
  implements IInputCreateProductDescription
{
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.name.not,
  })
  @Length(1, 100, {
    message: HttpExceptionMessagesGraphQL.validationProduct.name.length,
  })
  @Field({ description: 'Название', nullable: false })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.description.not,
  })
  @Length(1, 1000, {
    message: HttpExceptionMessagesGraphQL.validationProduct.description.length,
  })
  @Field({ description: 'Описание', nullable: false })
  description: string;

  @IsOptional()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.tag.not,
  })
  @Length(1, 100, {
    message: HttpExceptionMessagesGraphQL.validationProduct.tag.length,
  })
  @Field({ description: 'Тэг', nullable: true })
  tag: string;

  @IsOptional()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.meta_title.not,
  })
  @Length(1, 100, {
    message: HttpExceptionMessagesGraphQL.validationProduct.meta_title.length,
  })
  @Field({ description: 'Meta title', nullable: true })
  meta_title: string;

  @IsOptional()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.meta_h1.not,
  })
  @Length(1, 100, {
    message: HttpExceptionMessagesGraphQL.validationProduct.meta_h1.length,
  })
  @Field({ description: 'Meta H1', nullable: true })
  meta_h1: string;

  @IsOptional()
  @IsNotEmpty({
    message:
      HttpExceptionMessagesGraphQL.validationProduct.meta_description.not,
  })
  @Length(1, 100, {
    message:
      HttpExceptionMessagesGraphQL.validationProduct.meta_description.length,
  })
  @Field({ description: 'Meta описание', nullable: true })
  meta_description: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Состав' })
  compound: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Параметры модели' })
  model_parameters: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Уход' })
  care: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Параметры изделия' })
  parameters: string;

  constructor(
    name: string,
    description: string,
    tag: string,
    meta_title: string,
    meta_h1: string,
    meta_description: string,
    compound: string,
    model_parameters: string,
    care: string,
    parameters: string
  ) {
    this.name = name;
    this.description = description;
    this.tag = tag;
    this.meta_title = meta_title;
    this.meta_h1 = meta_h1;
    this.meta_description = meta_description;
    this.compound = compound;
    this.model_parameters = model_parameters;
    this.care = care;
    this.parameters = parameters;
  }
}

@InputType({ description: 'Входные данные для значений опций продукта' })
export class InputCreateProductOptionValueDTO {
  @IsNotEmpty()
  @Field({ description: 'ID опции' })
  optionId: string;

  @IsNotEmpty()
  @Field({ description: 'ID значения опции' })
  valueId: string;

  @IsNotEmpty()
  @IsNumber()
  @Field({ description: 'Цена значения опции', defaultValue: 0 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Field({ description: 'Количество товара у опции', defaultValue: 0 })
  quantity: number;

  @IsOptional()
  @Field({
    description: 'Ссылка на другой товар, может его id',
    defaultValue: null,
    nullable: true,
  })
  href: string;

  constructor(
    optionId: string,
    valueId: string,
    price: number,
    quantity: number,
    href: string
  ) {
    this.optionId = optionId;
    this.valueId = valueId;
    this.price = price;
    this.quantity = quantity;
    this.href = href;
  }
}

@InputType({ description: 'Входные данные для создания продукта' })
export class InputCreateProductDTO implements IInputCreateProduct {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.model.not,
  })
  @Length(1, 100, {
    message: HttpExceptionMessagesGraphQL.validationProduct.model.length,
  })
  @Field({ description: 'Модель продукта' })
  model: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.model.not,
  })
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.price.not,
  })
  @IsNumber(
    {},
    { message: HttpExceptionMessagesGraphQL.validationProduct.price.number }
  )
  @Min(0, {
    message: HttpExceptionMessagesGraphQL.validationProduct.price.min,
  })
  @Max(1000000000, {
    message: HttpExceptionMessagesGraphQL.validationProduct.price.max,
  })
  @Field({ description: 'Цена продукта' })
  price: number;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.quantity.not,
  })
  @IsNumber(
    {},
    { message: HttpExceptionMessagesGraphQL.validationProduct.quantity.number }
  )
  @IsNumber({}, { message: 'Количество продукта должна быть числом' })
  @Field({ description: 'Количество продукта' })
  quantity: number;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.maincategory.not,
  })
  @Field({ description: 'Главная категория' })
  maincategory: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.categories.not,
  })
  @Field(() => [String], { description: 'Категории продукта' })
  categories: string[];

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.status.not,
  })
  @Field({ description: 'Статус продукта' })
  status: boolean;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.status.not,
  })
  @IsNumber(
    {},
    { message: HttpExceptionMessagesGraphQL.validationProduct.sortOrder.number }
  )
  @Field({ description: 'Порядок сортировки' })
  sortOrder: number;

  @ValidateNested()
  @Type(() => InputCreateProductDescriptionDTO)
  @Field(() => InputCreateProductDescriptionDTO, {
    description: 'Описание продукта',
  })
  description: InputCreateProductDescriptionDTO;

  @ValidateNested()
  @Type(() => InputCreateProductImageDTO)
  @Field(() => [InputCreateProductImageDTO], {
    description: 'Изображения продукта',
  })
  images: InputCreateProductImageDTO[];

  @ValidateNested()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.options.not,
  })
  @Type(() => InputCreateProductOptionValueDTO)
  @Field(() => [InputCreateProductOptionValueDTO], {
    description: 'Значения опций продукта',
  })
  optionValues: InputCreateProductOptionValueDTO[];

  constructor(
    model: string,
    price: number,
    quantity: number,
    maincategory: string,
    categories: string[],
    status: boolean,
    sortOrder: number,
    description: InputCreateProductDescriptionDTO,
    images: InputCreateProductImageDTO[],
    optionValues: InputCreateProductOptionValueDTO[]
  ) {
    this.model = model;
    this.price = price;
    this.quantity = quantity;
    this.maincategory = maincategory;
    this.categories = categories;
    this.status = status;
    this.sortOrder = sortOrder;
    this.description = description;
    this.images = images;
    this.optionValues = optionValues;
  }
}

@InputType({ description: 'Входные данные для обноавление продукта' })
export class InputUpdateProductDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.id.not,
  })
  @Field(() => ID, { description: 'ID товара' })
  id: string;

  // @IsOptional({
  //   message: HttpExceptionMessagesGraphQL.validationProduct.maincategory.not,
  // })
  @IsOptional()
  @Field({ description: 'Главная категория', nullable: true })
  maincategory: string;

  // @IsOptional({
  //   message: HttpExceptionMessagesGraphQL.validationProduct.categories.not,
  // })
  @IsOptional()
  @Field(() => [String], { description: 'Категории продукта', nullable: true })
  categories: string[];

  @IsOptional({
    message: HttpExceptionMessagesGraphQL.validationProduct.status.not,
  })
  @Field({ description: 'Статус продукта', defaultValue: true })
  status: boolean;

  @IsOptional({
    message: HttpExceptionMessagesGraphQL.validationProduct.status.not,
  })
  @IsNumber(
    {},
    { message: HttpExceptionMessagesGraphQL.validationProduct.sortOrder.number }
  )
  @Field({ description: 'Порядок сортировки', nullable: true, defaultValue: 0 })
  sortOrder: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => InputCreateProductDescriptionDTO)
  @Field(() => InputCreateProductDescriptionDTO, {
    description: 'Описание продукта',
  })
  description: InputCreateProductDescriptionDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => InputCreateProductImageDTO)
  @Field(() => [InputCreateProductImageDTO], {
    description: 'Изображения продукта',
    nullable: true,
  })
  images: InputCreateProductImageDTO[];

  @IsOptional()
  // @ValidateNested()
  // @IsUrl(
  //   { protocols: ['https'], require_protocol: true },
  //   { message: 'Поле hrefCloudPhotos должно быть корректной ссылкой' }
  // )
  @Field(() => String, {
    description: 'Ссылка на архив фото',
    nullable: true,
  })
  hrefCloudPhotos: string;

  @ValidateNested()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationProduct.options.not,
  })
  @Type(() => InputCreateProductOptionValueDTO)
  @Field(() => [InputCreateProductOptionValueDTO], {
    description: 'Значения опций продукта',
  })
  optionValues: InputCreateProductOptionValueDTO[];

  @IsOptional()
  @Field(() => [String], {
    description: 'Список связанных товаров (ID)',
    nullable: true,
  })
  relatedProductsIds: string[];

  @IsOptional()
  @Field(() => [String], {
    description: 'Список товаров с другим цветом (ID)',
    nullable: true,
  })
  otherColorsProductsIds: string[];

  constructor(
    id: string,
    maincategory: string,
    categories: string[],
    status: boolean,
    sortOrder: number,
    description: InputCreateProductDescriptionDTO,
    images: InputCreateProductImageDTO[],
    hrefCloudPhotos: string,
    relatedProductsIds: string[],
    otherColorsProductsIds: string[]
  ) {
    this.id = id;
    this.maincategory = maincategory;
    this.categories = categories;
    this.status = status;
    this.sortOrder = sortOrder;
    this.description = description;
    this.images = images;
    this.hrefCloudPhotos = hrefCloudPhotos;
    this.relatedProductsIds = relatedProductsIds;
    this.otherColorsProductsIds = otherColorsProductsIds;
  }
}

@InputType({ description: 'Инпут для фильтров товаров' })
export class ProductsFilterInputDTO {
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Минимальная цена для фильтрации',
  })
  priceFrom: number;

  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Максимальная цена для фильтрации',
  })
  priceTo: number;

  @IsOptional()
  @Field({ nullable: true, description: 'Часть имени продукта для фильтрации' })
  name: string;

  @IsOptional()
  @Field(() => [String], { nullable: true, description: 'Фильтр по цветам' })
  colors: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true, description: 'Фильтр по размерам' })
  sizes: string[];

  constructor(
    priceFrom: number,
    priceTo: number,
    name: string,
    colors: string[],
    sizes: string[]
  ) {
    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
    this.name = name;
    this.colors = colors;
    this.sizes = sizes;
  }
}

@InputType({ description: 'Инпут для фильтров товаров в админке' })
export class ProductsFilterAdminDTO {
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Минимальная цена для фильтрации',
  })
  priceFrom: number;

  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Максимальная цена для фильтрации',
  })
  priceTo: number;

  @IsOptional()
  @Field({ nullable: true, description: 'Часть имени продукта для фильтрации' })
  name: string;

  @IsOptional()
  @Field(() => [String], { nullable: true, description: 'Фильтр по цветам' })
  colors: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true, description: 'Фильтр по размерам' })
  sizes: string[];

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Фильтр по главной категории',
  })
  mainCategoryId: string;

  @IsOptional()
  @Field(() => String, { nullable: true, description: 'Фильтр по категории' })
  categoryId: string;

  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
    description: 'Фильтр по статусу',
  })
  status: boolean;

  constructor(
    priceFrom: number,
    priceTo: number,
    name: string,
    colors: string[],
    sizes: string[],
    mainCategoryId: string,
    categoryId: string,
    status: boolean
  ) {
    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
    this.name = name;
    this.colors = colors;
    this.sizes = sizes;
    this.mainCategoryId = mainCategoryId;
    this.categoryId = categoryId;
    this.status = status;
  }
}
