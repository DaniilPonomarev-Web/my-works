import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Index,
} from 'typeorm';
import { Product } from './product.entity';
import { Option, OptionValue } from '../options/index';
import { IProductOptionValue } from '../../interfaces';

@Entity({ name: 'product_option_value' })
@Index(['product'])
@Index(['option'])
@Index(['value'])
export class ProductOptionValue implements IProductOptionValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.optionValues)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Option, (option) => option.values)
  @JoinColumn({ name: 'optionId' })
  option: Option;

  @ManyToOne(() => OptionValue, (value) => value.productOptionValues)
  @JoinColumn({ name: 'valueId' })
  value: OptionValue;

  @Column({ comment: 'Цена товара с опцией', default: 0 })
  price: number;

  @Column({ comment: 'Количество товара с этой опцией', default: 0 })
  quantity: number;

  @Column({
    comment: 'ссылка на товар либо его ID (для цветов)',
    nullable: true,
  })
  href: string;
}
