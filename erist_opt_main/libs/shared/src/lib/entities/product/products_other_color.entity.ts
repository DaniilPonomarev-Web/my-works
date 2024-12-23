import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { IOtherColorProduct } from '../../interfaces';

@Entity({ name: 'products_other_colors' })
@Index(['id'])
@Index(['otherColorProductId'])
export class OtherColorProducts
  extends BaseEntity
  implements IOtherColorProduct
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  otherColorProductId: string;

  @ManyToOne(() => Product, (product) => product.otherColorsProducts, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
