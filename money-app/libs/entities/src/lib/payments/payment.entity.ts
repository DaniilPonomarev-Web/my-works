import { Account } from '../account/account.entity';
import { BaseEntity } from '../base/base-entity';
import { IPayment } from './payment.interface';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Payment extends BaseEntity implements IPayment {
  @Column('uuid', { comment: 'Id головного клиента' })
  accountId: string;

  @ManyToOne('Account', 'payment')
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ comment: 'Значение сколько денег' })
  amount: number;

  @Column({ comment: 'Продолжительность подписки' })
  duration: string;

  @Column({ comment: 'Dанные транзакции' })
  transactionData: string;

  @Column({ type: 'varchar', comment: 'Описание платежа', default: '-' })
  description: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;
}
