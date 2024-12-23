import { Field, ObjectType } from '@nestjs/graphql';
import { ICategoryDescription } from '../../interfaces';

@ObjectType()
export class CategoryDescriptionDTO implements ICategoryDescription {
  @Field({ description: 'Принадлежность к категории - id' })
  id: string;

  @Field({ description: 'Название категории' })
  name: string;

  @Field({ nullable: true, description: 'Описание категории' })
  description: string | null;

  @Field({ nullable: true, description: 'meta_title' })
  meta_title: string | null;

  @Field({ nullable: true, description: 'meta_h1' })
  meta_h1: string | null;

  @Field({ nullable: true, description: 'meta_description' })
  meta_description: string | null;

  @Field({ nullable: true, description: 'meta_keyword' })
  meta_keyword: string | null;

  constructor(
    id: string,
    name: string,
    description: string | null,
    meta_title: string | null,
    meta_h1: string | null,
    meta_description: string | null,
    meta_keyword: string | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.meta_title = meta_title;
    this.meta_h1 = meta_h1;
    this.meta_description = meta_description;
    this.meta_keyword = meta_keyword;
  }
}
