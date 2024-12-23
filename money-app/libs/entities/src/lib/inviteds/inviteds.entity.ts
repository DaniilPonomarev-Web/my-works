import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../base/base-entity';
import { Account } from '../account/account.entity';
import { Group } from '../group/group.entity';
import { IInviteds } from './inviteds.interface';

@Entity()
export class Inviteds extends BaseEntity implements IInviteds {
  /**
   * Id клиента, который пригласил пользователя
   */
  @Column({ type: 'uuid', comment: 'ID головного клиента' })
  accountId: string;

  /**
   * Id группы в которую приглашается пользователь
   */
  @Column({ type: 'uuid', comment: 'группа' })
  groupId: string;

  /**
   * Номер телефона для индетификации
   */
  @Column({
    comment: 'Номер телефона',
  })
  phone: string;

  /**
   * email я отправки приглашения
   */
  @Column({ comment: 'email я отправки приглашения' })
  email: string;

  /**
   * Дата до которой действует инвайт
   */
  @Column({
    type: 'timestamptz',
    nullable: true,
    default: () => "NOW() + interval '14 days'",
    comment: 'Дата до которой действует инвайт',
  })
  validity: Date;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Было ли использование',
  })
  used: boolean;

  /**
   * Хеш данных приглашения
   */
  @Column({ comment: 'Хеш данных приглашения' })
  hash: string;

  @ManyToOne('Account', 'inviteds')
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @ManyToOne('Group', 'inviteds')
  @JoinColumn({ name: 'groupId' })
  group: Group;
}
