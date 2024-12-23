import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import { Option } from './options.entity';
import { ProductOptionValue } from '../product/product_option_value.entity';
import { IOptionValue } from '../../interfaces';

@Entity({ name: 'option_value' })
export class OptionValue extends BaseEntity implements IOptionValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  sortOrder: number;

  @ManyToOne(() => Option, (option) => option.values)
  option: Option;

  @OneToMany(
    () => ProductOptionValue,
    (productOptionValue) => productOptionValue.value
  )
  productOptionValues: ProductOptionValue[];

  @Column({
    comment: 'ID в 1С',
    nullable: true,
    default: null,
    unique: true,
  })
  id1c: string;

  @Column({
    comment: 'Код цвета',
    nullable: true,
    default: null,
    unique: false,
  })
  colorCode: string | null;

  constructor(
    id: string,
    name: string,
    sortOrder: number,
    option: Option,
    productOptionValues: ProductOptionValue[],
    id1c: string
  ) {
    super();
    this.id = id;
    this.name = name;
    this.sortOrder = sortOrder;
    this.option = option;
    this.productOptionValues = productOptionValues;
    this.id1c = id1c;
  }
}
