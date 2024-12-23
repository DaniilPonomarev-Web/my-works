import { IGroup } from './group.interface';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base-entity';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Account } from '../account/account.entity';

@Entity()
export class Group extends BaseEntity implements IGroup {
  @Column({ comment: 'Название группы' })
  name: string;

  @Column({ type: 'uuid', comment: 'ID аккаунта' })
  accountId: string;

  @ManyToOne('Account', 'group')
  @JoinColumn({ name: 'clientId' })
  account: Account;

  @Column({ default: true, comment: 'Статус группы' })
  status: boolean;

  @OneToMany('User', 'group', { nullable: true })
  users: User[];

  @OneToMany('Category', 'group')
  categories: Category[];
}
