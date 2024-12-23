import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class CategoryDescription {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.descriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  category: Category;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_h1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_keyword: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  catIdOneC: string;

  constructor(
    id: string,
    category: Category,
    name: string,
    description: string,
    meta_title: string,
    meta_h1: string,
    meta_description: string,
    meta_keyword: string,
    catIdOneC: string
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.description = description;
    this.meta_title = meta_title;
    this.meta_h1 = meta_h1;
    this.meta_description = meta_description;
    this.meta_keyword = meta_keyword;
    this.catIdOneC = catIdOneC;
  }
}
