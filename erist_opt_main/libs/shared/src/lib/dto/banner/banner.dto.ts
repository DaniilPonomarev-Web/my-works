import { InputType, Field, ObjectType, ID, Float } from '@nestjs/graphql';
import {
  IBanner,
  IBannersList,
  ICreateBannerInput,
  IUpdateBannerInput,
} from '../../interfaces';
import { Length, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType({ description: 'DTO для создания баннера' })
export class CreateBannerInputDTO implements ICreateBannerInput {
  @Length(1, 30, {
    message: HttpExceptionMessagesGraphQL.validationsBanner.name.length,
  })
  @Field({ description: 'Название баннера', nullable: false })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.status.not,
  })
  @Field({ description: 'Статус баннера', nullable: false })
  status: boolean;

  @IsOptional()
  @Length(1, 30, {
    message: HttpExceptionMessagesGraphQL.validationsBanner.title.length,
  })
  @Field({ description: 'Заголовок на баннере', nullable: true })
  title: string;

  @IsOptional()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.link.not,
  })
  @IsString({
    message: HttpExceptionMessagesGraphQL.validationsBanner.link.notValid,
  })
  @Field({ description: 'Ссылка на баннере', nullable: true })
  link: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.image.not,
  })
  @Field({ description: 'Изображение для десктопа', nullable: false })
  image: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.image_mob.not,
  })
  @Field({ description: 'Изображение для мобилки', nullable: false })
  image_mob: string;

  constructor(
    name: string,
    status: boolean,
    title: string,
    link: string,
    image: string,
    image_mob: string
  ) {
    this.name = name;
    this.status = status;
    this.title = title;
    this.link = link;
    this.image = image;
    this.image_mob = image_mob;
  }
}

@InputType({ description: 'DTO для обнновления полей баннера' })
export class UpdateBannerInputDTO implements IUpdateBannerInput {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.id.not,
  })
  @Field(() => ID, { description: 'UUID Баннера', nullable: false })
  id: string;

  @Length(1, 30, {
    message: HttpExceptionMessagesGraphQL.validationsBanner.name.length,
  })
  @Field({ description: 'Название баннера', nullable: false })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.status.not,
  })
  @Field({ description: 'Статус баннера', nullable: false })
  status: boolean;

  @IsOptional()
  @Length(1, 30, {
    message: HttpExceptionMessagesGraphQL.validationsBanner.title.length,
  })
  @Field({ description: 'Заголовок на баннере', nullable: true })
  title: string;

  @IsOptional()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.link.not,
  })
  @IsString({
    message: HttpExceptionMessagesGraphQL.validationsBanner.link.notValid,
  })
  @Field({ description: 'Ссылка на баннере', nullable: true })
  link: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.image.not,
  })
  @Field({ description: 'Изображение для десктопа', nullable: false })
  image: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsBanner.image_mob.not,
  })
  @Field({ description: 'Изображение для мобилки', nullable: false })
  image_mob: string;

  constructor(
    id: string,
    name: string,
    status: boolean,
    title: string,
    link: string,
    image: string,
    image_mob: string
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.title = title;
    this.link = link;
    this.image = image;
    this.image_mob = image_mob;
  }
}

@ObjectType({ description: 'DTO баннера' })
export class BannerDTO implements IBanner {
  @Field(() => ID, { description: 'UUID Баннера' })
  id: string;

  @Field({ description: 'Название баннера', nullable: false })
  name: string;

  @Field({ description: 'Статус баннера', nullable: false })
  status: boolean;

  @Field({ description: 'Заголовок на баннере', nullable: true })
  title: string;

  @Field({ description: 'Ссылка на баннере', nullable: true })
  link: string;

  @Field({ description: 'Изображение для десктопа', nullable: false })
  image: string;

  @Field({ description: 'Изображение для мобилки', nullable: false })
  image_mob: string;

  @Field({
    description: 'Изображение для десктопа ссылка minio',
    nullable: false,
  })
  image_href: string;

  @Field({
    description: 'Изображение для мобилки ссылка minio',
    nullable: false,
  })
  image_mob_href: string;

  constructor(
    id: string,
    name: string,
    status: boolean,
    title: string,
    link: string,
    image: string,
    image_mob: string
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.title = title;
    this.link = link;
    this.image = image;
    this.image_mob = image_mob;
  }
}

@ObjectType({ description: 'Список баннеров' })
export class BannersListDTO implements IBannersList {
  @Field(() => [BannerDTO], { description: 'Список баннеров' })
  banners: BannerDTO[];

  @Field(() => Float, { description: 'Количество баннеров' })
  total: number;

  constructor(banners: BannerDTO[], total: number) {
    this.banners = banners;
    this.total = total;
  }
}

@ObjectType({ description: 'Изображение баннера' })
export class BannerUploadImageDTO {
  @Field({ description: 'Название изображения в minio' })
  imageName: string;
  constructor(imageName: string) {
    this.imageName = imageName;
  }
}

@InputType({ description: 'Инпут для загрузки картинки в MINIO для баннера' })
export class InputBannerImageUploadDTO {
  @IsOptional()
  @Field(() => GraphQLUpload, {
    nullable: true,
    description: 'Прикрепить изображение',
  })
  image: Promise<FileUpload> | null;

  constructor(image: Promise<FileUpload> | null) {
    this.image = image;
  }
}
