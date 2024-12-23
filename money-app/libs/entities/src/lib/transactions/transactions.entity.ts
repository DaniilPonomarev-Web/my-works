// eslint-disable-next-line @nx/enforce-module-boundaries
import { TransactionPayload } from '@money-app/shared';
import { BaseEntity } from '../base/base-entity';
import { Entity, Column, Index, TableInheritance } from 'typeorm';

type OperationType = 'expense' | 'income';

@Entity()
@Index('idx_account_id', ['AccountID'])
@Index('idx_user_id', ['UserID'])
// @TableInheritance({ column: { type: 'timestamp', name: 'EventDate' } })
export class Transaction extends BaseEntity implements TransactionPayload {
  @Column({ type: 'uuid', comment: 'ID аккаунта' })
  AccountID: string;

  @Column({ type: 'uuid', comment: 'ID пользователя' })
  UserID: string;

  @Column({ comment: 'Имя пользователя' })
  FirstName: string;

  @Column({ type: 'bigint', comment: 'ID пользователя телеграмма' })
  ChatID: number;

  @Column({ type: 'uuid', comment: 'ID группы' })
  GroupID: string;

  @Column({ comment: 'Наименование группы' })
  GroupName: string;

  @Column({ type: 'uuid', comment: 'ID валюты' })
  CurrencyID: string;

  @Column({ comment: 'Наименование валюты' })
  CurrencyName: string;

  @Column({ type: 'uuid', comment: 'ID категории' })
  CategoryID: string;

  @Column({ comment: 'Наименование категории' })
  CategoryName: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    comment: 'Сумма транзакции',
  })
  Value: number;

  @Column({ type: 'timestamp', comment: 'Дата зачисления' })
  EventDate: Date;

  @Column({
    type: 'enum',
    enum: ['expense', 'income'],
    comment: 'Тип операции',
  })
  Operation: OperationType;
}
