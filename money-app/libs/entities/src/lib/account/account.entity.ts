import { AccountType, IAccount } from './account.interface';
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base/base-entity';
import { User } from '../user/user.entity';
import { Group } from '../group/group.entity';
import { Category } from '../category/category.entity';
import { Payment } from '../payments/payment.entity';

@Entity()
export class Account extends BaseEntity implements IAccount {
  @PrimaryGeneratedColumn('uuid')
  override id: string;

  @Column({
    nullable: true,
    comment: 'Настройки',
    default: { remindersEnabled: 1, testTest: 0 },
  })
  setting: string;

  @Column({ unique: true, type: 'bigint', comment: 'chatID аккаунта' })
  key: number;

  @Column({ type: 'varchar', nullable: true, comment: 'Тип Клиента' })
  type: AccountType;

  @Column({
    type: 'date',
    default: () => `CURRENT_DATE + INTERVAL '1 WEEK'`,
    comment: 'Подписка',
  })
  subscribe: Date;

  @CreateDateColumn({ type: 'timestamptz', comment: 'Дата регистрации' })
  registred: Date;

  @Column({ type: 'timestamptz', nullable: true })
  blocked: Date;

  @OneToMany('User', 'client', { nullable: true })
  users: User[];

  @OneToMany('Group', 'client', { nullable: true })
  groups: Group[];

  @OneToMany('Category', 'client', { nullable: true })
  categories: Category[];

  @OneToMany('Payment', 'client', { nullable: true })
  payments: Payment;
}
