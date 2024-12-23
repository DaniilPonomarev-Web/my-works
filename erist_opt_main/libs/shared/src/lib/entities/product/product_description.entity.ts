import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
} from 'typeorm';
import { IProductDescription } from '../../interfaces';

@Entity({ name: 'product_description' })
@Index(['name'])
@Index(['description'], { fulltext: true }) // Для полнотекстового поиска
@Index(['tag'])
export class ProductDescription
  extends BaseEntity
  implements IProductDescription
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ default: null, nullable: true })
  tag: string;

  @Column({ default: null, nullable: true })
  meta_title: string;

  @Column({ default: null, nullable: true })
  meta_h1: string;

  @Column({ default: null, nullable: true })
  meta_description: string;

  @Column({ default: null, nullable: true })
  compound: string;

  @Column({ default: null, nullable: true })
  model_parameters: string;

  @Column({ default: null, nullable: true })
  care: string;

  @Column({ default: null, nullable: true })
  parameters: string;

  // @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  // productIdOneC: string;

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
    super();
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
