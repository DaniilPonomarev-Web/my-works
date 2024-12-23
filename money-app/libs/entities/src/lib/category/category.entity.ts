import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base-entity';
import { ICategory } from './category.interface';
import { Account } from '../account/account.entity';

enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

@Entity()
export class Category extends BaseEntity implements ICategory {
  @Column({ type: 'uuid', comment: 'ID аккаунта' })
  accountId: string;

  @ManyToOne('Account', 'category')
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ comment: 'Название категории' })
  name: string;

  @Column({ type: 'uuid', comment: 'Id группы' })
  groupId: string;

  @Column({ type: 'text', comment: 'Доход/расход', enum: TransactionType }) // income or expence
  type: TransactionType;

  @Column({ comment: 'Статус категории' })
  status: boolean;

  @Column({ comment: 'Лимит в категории', nullable: true })
  limit: number;
}
