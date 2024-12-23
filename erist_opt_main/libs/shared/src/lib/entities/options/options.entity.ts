import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { OptionValue } from './options-value.entity';
import { IOption } from '../../interfaces';

@Entity({ name: 'option' })
export class Option extends BaseEntity implements IOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('int')
  sortOrder: number;

  @Column({
    comment: 'ID в 1С',
    nullable: true,
    default: null,
    unique: true,
  })
  id1c: string;

  @OneToMany(() => OptionValue, (optionValue) => optionValue.option, {
    cascade: true,
  })
  values: OptionValue[];
}
