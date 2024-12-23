import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IProductDescription } from '../../interfaces';

@ObjectType({ description: 'Описание продукта' })
export class ProductDescriptionDTO implements IProductDescription {
  @Field(() => ID, { description: 'ID описания' })
  id: string;

  @Field({ description: 'Название' })
  name: string;

  @Field({ description: 'Описание', nullable: true })
  description: string;

  @Field({ description: 'Тэг', nullable: true })
  tag: string;

  @Field({ description: 'Meta title', nullable: true })
  meta_title: string;

  @Field({ description: 'Meta H1', nullable: true })
  meta_h1: string;

  @Field({ description: 'Meta описание', nullable: true })
  meta_description: string;

  @Field({ nullable: true, description: 'Состав' })
  compound: string;

  @Field({ nullable: true, description: 'Параметры модели' })
  model_parameters: string;

  @Field({ nullable: true, description: 'Уход' })
  care: string;

  @Field({ nullable: true, description: 'Параметры изделия' })
  parameters: string;

  constructor(
    id: string,
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
    this.id = id;
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
