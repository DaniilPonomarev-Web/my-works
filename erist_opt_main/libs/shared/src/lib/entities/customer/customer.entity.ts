import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { RefreshTokenCustomer } from '../jwt/jwt.entity';
import { ICustomer } from '../../interfaces';
import { CustomerRole } from '../../types';

@Entity()
export class Customer extends BaseEntity implements ICustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: false,
    comment: 'login для входа',
  })
  login: string;

  @Column({ unique: true, comment: 'email пользователя' })
  email: string;

  @Column({ type: 'varchar', comment: 'Роль' })
  role: CustomerRole;

  @Column({ comment: 'Пароль' })
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    comment: 'Дата последнего входа',
  })
  lastLogin: Date;

  @OneToMany(
    () => RefreshTokenCustomer,
    (refreshToken) => refreshToken.customer
  )
  refreshTokens: RefreshTokenCustomer[];

  constructor(
    id: string,
    login: string,
    password: string,
    email: string,
    role: CustomerRole,
    lastLogin: Date,
    refreshTokens: RefreshTokenCustomer[]
  ) {
    super();
    this.id = id;
    this.login = login;
    this.password = password;
    this.email = email;
    this.role = role;
    this.lastLogin = lastLogin;
    this.refreshTokens = refreshTokens;
  }
}
