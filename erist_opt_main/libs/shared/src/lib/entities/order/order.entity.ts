import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../user/user.entity';
import { AddToCartInput } from '../../dto';
import { StateOrder } from '../../types';

@Entity()
@Index(['id'])
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ comment: 'Наименование компании' })
  userCompany_name: string;

  @Column({ comment: 'Юридический адрес компании' })
  userCompany_urAddress: string;

  @Column({ comment: 'ИНН компании' })
  userCompany_inn: string;

  @Column({ comment: 'КПП компании', nullable: true })
  userCompany_kpp: string | null;

  @Column({ comment: 'ОГРН(-ИП) компании', nullable: true }) //TODO сделать FALSE
  userCompany_ogrn: string;

  @Column({ comment: 'Расчетный счет' })
  userCompany_checkingAccount: string;

  @Column({ comment: 'Название банка' })
  userCompany_bankName: string;

  @Column({ comment: 'БИК банка' })
  userCompany_bikBank: string;

  @Column({ comment: 'Корреспондентский счет' })
  userCompany_correspondentAccount: string;

  // @Column({ comment: 'Адрес доставки одной' })
  // shippingAddress: string;

  @Column()
  paymentMethod: string;

  @Column('json')
  cart: AddToCartInput[];

  @Column({ type: 'real', comment: 'Сумма товаров в заказе' })
  totalAmount: number;

  @Column({ type: 'real', nullable: true, comment: 'скидка' })
  discount: number | null;

  @Column({ type: 'real', comment: 'Сумма заказа' })
  total: number;

  @Column({ comment: 'Выгружен ли в 1с', default: false })
  inOneC: boolean;

  @Column({ comment: 'Статус заказа', default: StateOrder.created })
  state: string;

  @CreateDateColumn({ type: 'timestamptz', comment: 'Дата создания заказа' })
  registred: Date;

  @UpdateDateColumn({ type: 'timestamptz', comment: 'Дата обновления заказа' })
  updated: Date;

  @Column({ type: 'int', unique: true })
  currentID: number;

  @Column({ unique: false, nullable: true, default: null })
  hrefForInvoice: string;

  @Column({
    comment: 'ID заказа в 1с',
    nullable: true,
    default: null,
  })
  id1c: string;
}
