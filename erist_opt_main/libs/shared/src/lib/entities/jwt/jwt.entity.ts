import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user';
import { Customer } from '../customer/customer.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Уникальный идентификатор обновляющего токена',
  })
  id: string;

  @Column({ name: 'token', comment: 'Токен обновления' })
  token: string;

  @Column({
    name: 'expiresAt',
    comment: 'Дата и время истечения срока действия токена',
  })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  constructor(id: string, token: string, expiresAt: Date, user: User) {
    this.id = id;
    this.token = token;
    this.expiresAt = expiresAt;
    this.user = user;
  }
}

@Entity()
export class RefreshTokenCustomer {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Уникальный идентификатор обновляющего токена',
  })
  id: string;

  @Column({ name: 'token', comment: 'Токен обновления' })
  token: string;

  @Column({
    name: 'expiresAt',
    comment: 'Дата и время истечения срока действия токена',
  })
  expiresAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.refreshTokens, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer: Customer;

  constructor(id: string, token: string, expiresAt: Date, customer: Customer) {
    this.id = id;
    this.token = token;
    this.expiresAt = expiresAt;
    this.customer = customer;
  }
}
