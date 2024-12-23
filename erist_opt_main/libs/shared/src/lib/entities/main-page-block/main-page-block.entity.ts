import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
  Index,
} from 'typeorm';
import { Product } from '../product';
import { IMainPageBlock } from '../../interfaces';

@Entity({ name: 'main_page_block' })
@Index(['id'])
@Index(['sort'])
@Index(['status'])
export class MainPageBlock extends BaseEntity implements IMainPageBlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column({ default: 0 })
  sort: number;

  @Column({ default: true })
  status: boolean;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  constructor(
    id: string,
    name: string,
    title: string,
    link: string,
    sort: number,
    status: boolean,
    products: Product[]
  ) {
    super();
    this.id = id;
    this.name = name;
    this.title = title;
    this.link = link;
    this.sort = sort;
    this.status = status;
    this.products = products;
  }
}
