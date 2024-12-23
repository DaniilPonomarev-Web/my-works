import { Account } from '../account/account.entity';
import { BaseEntity } from '../base/base-entity';
import { Group } from '../group/group.entity';
import { IUser, UserRole } from './user.interface';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({ type: 'uuid', comment: 'Id головного клиента' })
  accountId: string;

  @ManyToOne('Account', 'user')
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ type: 'uuid', comment: 'Id группы в которой состоит' })
  groupId: string;

  @ManyToOne('Group', 'user')
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @Column({ type: 'bigint', comment: 'ID телеграмм чата' })
  chatId: number;

  @Column({ comment: 'Имя', nullable: true })
  firstName: string;

  @Column({ comment: 'Фамилия', nullable: true })
  lastName: string;

  @Column({ unique: true, comment: 'Номер телефона' })
  phone: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'varchar', comment: 'Роль' })
  role: UserRole;
}
