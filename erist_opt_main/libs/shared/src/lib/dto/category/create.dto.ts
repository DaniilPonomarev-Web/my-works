import { HttpExceptionMessagesGraphQL } from '@erist-opt/shared';
import { Field, InputType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CategoryDescriptionInputDTO {
  @IsOptional()
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.category.validations.name.not,
  })
  @Field({ description: 'Название категории' })
  name: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Описание категории' })
  description: string;

  @IsOptional()
  @Field({ nullable: true, description: 'meta_title' })
  meta_title: string;

  @IsOptional()
  @Field({ nullable: true, description: 'meta_h1' })
  meta_h1: string;

  @IsOptional()
  @Field({ nullable: true, description: 'meta_description' })
  meta_description: string;

  @IsOptional()
  @Field({ nullable: true, description: 'meta_keyword' })
  meta_keyword: string;

  constructor(
    name: string,
    description: string,
    meta_title: string,
    meta_h1: string,
    meta_description: string,
    meta_keyword: string
  ) {
    this.name = name;
    this.description = description;
    this.meta_title = meta_title;
    this.meta_h1 = meta_h1;
    this.meta_description = meta_description;
    this.meta_keyword = meta_keyword;
  }
}

@InputType()
export class CreateCategoryWithDescriptionDTO {
  @IsOptional()
  @Field({ nullable: true, description: 'Ссылка на изображение категории' })
  image: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Родиттельская категория' })
  parent_id: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      message:
        HttpExceptionMessagesGraphQL.category.validations.sort.errorCharter,
    }
  )
  @Field(() => Number, {
    nullable: true,
    description: 'Порядок сортировки',
    defaultValue: 0,
  })
  sort_order: number;

  @IsOptional()
  @Field({ nullable: false, description: 'Cтатус категории' })
  status: boolean;

  @ValidateNested()
  @Type(() => CategoryDescriptionInputDTO)
  @Field(() => [CategoryDescriptionInputDTO])
  descriptions: CategoryDescriptionInputDTO[];

  constructor(
    image: string,
    parent_id: string,
    sort_order: number,
    status: boolean,
    descriptions: CategoryDescriptionInputDTO[]
  ) {
    this.image = image;
    this.parent_id = parent_id;
    this.sort_order = sort_order;
    this.status = status;
    this.descriptions = descriptions;
  }
}
