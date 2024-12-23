import { BaseEntity } from '../base/base-entity';
import { ICurrency } from './currency.interface';
import { Entity, Column } from 'typeorm';

@Entity()
export class Currency extends BaseEntity implements ICurrency {
  @Column({ comment: 'Имя' })
  name: string;

  @Column({ comment: 'C ?? ' })
  symbol: string;
}
