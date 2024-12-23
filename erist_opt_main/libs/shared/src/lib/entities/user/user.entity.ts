import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IUser, IUserAgreement } from '../../interfaces';
import { UserCompany } from './user_company.entity';
import { UserAddress } from './user_address.entity';
import { RefreshToken } from '../jwt/jwt.entity';
import { Order } from '../order/order.entity';
import { UserAgreement } from './user_agreement.entity';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: false,
    comment: 'Статус пользователя',
    default: true,
  })
  status: boolean;

  @Column({ unique: true })
  phone: string;

  @Column({
    unique: false,
    comment: 'Имя компании или имя и фамилия контактного лица',
  })
  name: string;

  @Column({ unique: true, comment: 'email пользователя' })
  email: string;

  @Column({ comment: 'пароль' })
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Дата регистрации',
  })
  registrationDate: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    comment: 'Дата последнего входа',
  })
  lastLogin: Date | null;

  @OneToOne(() => UserCompany)
  @JoinColumn()
  company: UserCompany;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => UserAgreement)
  @JoinColumn()
  agreement: UserAgreement;

  // @OneToMany(() => UserAddress, (address) => address.user)
  // addresses: UserAddress[];

  constructor(
    id: string,
    status: boolean,
    phone: string,
    name: string,
    password: string,
    email: string,
    registrationDate: Date,
    lastLogin: Date | null,
    company: UserCompany,
    // addresses: UserAddress[],
    refreshTokens: RefreshToken[],
    agreement: UserAgreement
  ) {
    super();
    this.id = id;
    this.status = status;
    this.phone = phone;
    this.name = name;
    this.password = password;
    this.email = email;
    this.registrationDate = registrationDate;
    this.lastLogin = lastLogin;
    this.company = company;
    // this.addresses = addresses;
    this.refreshTokens = refreshTokens;
    this.agreement = agreement;
  }
}
