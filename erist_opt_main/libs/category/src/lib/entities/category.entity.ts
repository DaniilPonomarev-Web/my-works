import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { CategoryDescription } from './category-description.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: null })
  image: string;

  @Column({ nullable: true, default: null })
  parent_id: string | null;

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @OneToMany(() => CategoryDescription, (description) => description.category)
  descriptions: CategoryDescription[];

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'boolean', default: false })
  onHomePage: boolean;

  @Column({
    comment: 'ID в 1С',
    nullable: true,
    default: null,
    unique: true,
  })
  id1c: string;

  constructor(
    id: string,
    image: string,
    parent_id: string,
    sort_order: number,
    status: boolean,
    onHomePage: boolean,
    parent: Category,
    children: Category[],
    descriptions: CategoryDescription[],
    id1c: string
  ) {
    super();
    this.id = id;
    this.image = image;
    this.parent_id = parent_id;
    this.sort_order = sort_order;
    this.status = status;
    this.onHomePage = onHomePage;
    this.parent = parent;
    this.children = children;
    this.descriptions = descriptions;
    this.id1c = id1c;
  }
}
