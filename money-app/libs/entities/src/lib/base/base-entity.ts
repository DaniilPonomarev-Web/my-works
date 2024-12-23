import { IBaseEntity, IBaseEntityNoConfirm } from './entity.interface';
import type { Maybe } from '@money-app/shared';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntityNoConfirm implements IBaseEntityNoConfirm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Дата создания
   */
  @CreateDateColumn({ type: 'timestamptz', comment: 'Дата создания' })
  created: Date;

  /**
   * Дата последнего обновления
   */
  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    comment: 'Дата последнего обновления',
  })
  updated: Date;

  /**
   * Дата удаления
   */
  @DeleteDateColumn({ type: 'timestamptz', comment: 'Дата удаления' })
  deleted: Maybe<Date>;
}

export abstract class BaseEntity
  extends BaseEntityNoConfirm
  implements IBaseEntity
{
  /**
   * Дата запроса на удаления
   */
  @Column({
    type: 'timestamptz',
    nullable: true,
    comment: 'Дата запроса на удаления',
  })
  deleteRequest: Maybe<Date>;
}
