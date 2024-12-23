import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

@InputType()
export class UpdateCategoryDescriptionDTO {
  @IsOptional()
  @Field({ description: 'Принадлежность к категории - id' })
  id: string;

  @IsOptional()
  @Field({ nullable: false, description: 'Название категории' })
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
    id: string,
    name: string,
    description: string,
    mata_tilte: string,
    meta_h1: string,
    meta_description: string,
    meta_keyword: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.meta_title = mata_tilte;
    this.meta_h1 = meta_h1;
    this.meta_description = meta_description;
    this.meta_keyword = meta_keyword;
  }
}

@InputType()
export class UpdateCategoryDTO {
  @IsOptional()
  @Field()
  id: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Ссылка на изображение' })
  image: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Родительская категория' })
  parent_id: string;

  @IsOptional()
  @Field(() => Number, { nullable: false, description: 'Порядок сортировки' })
  sort_order: number;

  @IsOptional()
  @Field({ nullable: true, description: 'Статус категории' })
  status: boolean;

  @IsOptional()
  @Field({ nullable: true, description: 'На главную' })
  onHomePage: boolean;

  @ValidateNested()
  @Type(() => UpdateCategoryDescriptionDTO)
  @Field(() => [UpdateCategoryDescriptionDTO], {
    description: 'Описания категории',
  })
  descriptions: UpdateCategoryDescriptionDTO[];

  constructor(
    id: string,
    image: string,
    parent_id: string,
    sort_order: number,
    status: boolean,
    onHomePage: boolean,
    descriptions: UpdateCategoryDescriptionDTO[]
  ) {
    this.id = id;
    this.image = image;
    this.parent_id = parent_id;
    this.sort_order = sort_order;
    this.status = status;
    this.onHomePage = onHomePage;
    this.descriptions = descriptions;
  }
}
