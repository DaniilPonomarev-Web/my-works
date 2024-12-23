import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { IProductRelated } from '../../interfaces';
import { Product } from './product.entity';

@Entity({ name: 'products_related' })
@Index(['id'])
@Index(['relatedProductId'])
export class ProductsRelated extends BaseEntity implements IProductRelated {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  relatedProductId: string;

  @ManyToOne(() => Product, (product) => product.productsRelated, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
