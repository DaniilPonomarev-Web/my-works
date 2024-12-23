import { InputType, Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { IMainPageBlock, IMainPageBlockList } from '../../interfaces';
import { ProductDTO } from '../product';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';

@InputType({ description: 'DTO для создания блока на главной странице' })
export class CreateMainPageBlockInputDTO {
  @Length(1, 30, {
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.name.length,
  })
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.name.not,
  })
  @Field(() => String, { description: 'Название блока', nullable: false })
  name: string;

  @Length(3, 30, {
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.title.length,
  })
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.title.not,
  })
  @Field(() => String, { description: 'Заголовок блока', nullable: false })
  title: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.link.not,
  })
  @IsString({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.link.notValid,
  })
  @Field(() => String, { description: 'Ссылка блока', nullable: false })
  link: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.sort.not,
  })
  @IsNumber(
    {},
    {
      message:
        HttpExceptionMessagesGraphQL.validationMainPageBlock.sort.errorCharter,
    }
  )
  @Field(() => Number, { description: 'Ссылка блока', nullable: false })
  sort: number;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.status.not,
  })
  @Field(() => Boolean, { description: 'Статус блока', nullable: false })
  status: boolean;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.products.not,
  })
  @Field(() => [String], { description: 'Товары в блоке', nullable: false })
  products: string[];

  constructor(
    name: string,
    title: string,
    link: string,
    sort: number,
    status: boolean,
    products: string[]
  ) {
    this.name = name;
    this.title = title;
    this.link = link;
    this.sort = sort;
    this.status = status;
    this.products = products;
  }
}

@InputType({ description: 'DTO для обновления блока на главной странице' })
export class UpdateMainPageBlockInputDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.id.not,
  })
  @Field(() => ID, { description: 'UUID Блока', nullable: false })
  id: string;

  @Length(1, 30, {
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.name.length,
  })
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.name.not,
  })
  @Field(() => String, { description: 'Название блока', nullable: false })
  name: string;

  @Length(3, 30, {
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.title.length,
  })
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.title.not,
  })
  @Field(() => String, { description: 'Заголовок блока', nullable: false })
  title: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.link.not,
  })
  @IsString({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.link.notValid,
  })
  @Field(() => String, { description: 'Ссылка блока', nullable: false })
  link: string;

  @IsNumber(
    {},
    {
      message:
        HttpExceptionMessagesGraphQL.validationMainPageBlock.sort.errorCharter,
    }
  )
  @Field(() => Number, { description: 'Ссылка блока', nullable: false })
  sort: number;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.status.not,
  })
  @Field(() => Boolean, { description: 'Статус блока', nullable: false })
  status: boolean;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationMainPageBlock.products.not,
  })
  @Field(() => [String], { description: 'Товары в блоке', nullable: false })
  products: string[];

  constructor(
    id: string,
    name: string,
    title: string,
    link: string,
    sort: number,
    status: boolean,
    products: string[]
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.link = link;
    this.sort = sort;
    this.status = status;
    this.products = products;
  }
}

@InputType({ description: 'DTO c ID блока на главной странице' })
export class IdMainPageBlockInputDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.id.not,
  })
  @Field(() => ID, { description: 'UUID Блока', nullable: false })
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

@ObjectType({ description: 'DTO для блока на главной странице' })
export class MainPageBlockDTO implements IMainPageBlock {
  @Field(() => ID, { description: 'UUID Блока', nullable: false })
  id: string;

  @Field(() => String, { description: 'Название блока', nullable: true })
  name: string;

  @Field(() => String, { description: 'Заголовок блока', nullable: true })
  title: string;

  @Field(() => String, { description: 'Ссылка блока', nullable: true })
  link: string;

  @Field(() => Number, { description: 'Ссылка блока', nullable: false })
  sort: number;

  @Field(() => Boolean, { description: 'Статус блока', nullable: false })
  status: boolean;

  @Field(() => [ProductDTO], { description: 'Товары в блоке', nullable: false })
  products: ProductDTO[];

  constructor(
    id: string,
    name: string,
    title: string,
    link: string,
    sort: number,
    status: boolean,
    products: ProductDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.link = link;
    this.sort = sort;
    this.status = status;
    this.products = products;
  }
}

@ObjectType({ description: 'Список Блоков на главной странице' })
export class MainPageBlockListDTO implements IMainPageBlockList {
  @Field(() => [MainPageBlockDTO], { description: 'Список блоков ' })
  blocks: MainPageBlockDTO[];

  @Field(() => Float, { description: 'Количество блоков' })
  total: number;

  constructor(blocks: MainPageBlockDTO[], total: number) {
    this.blocks = blocks;
    this.total = total;
  }
}
