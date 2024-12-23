import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { IJournal } from '../../interfaces';

/**
 * @entity Journal
 * @description Представление журнала действий в системе.
 * Каждый элемент журнала отслеживает действия, выполненные пользователем или системой.
 */
@Entity({ name: 'journals' })
@Index(['id'])
export class Journal extends BaseEntity implements IJournal {
  /**
   * Уникальный идентификатор записи журнала.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Сервис в котором это действие было выполнено.
   */
  @Column({ comment: 'Сервис, в котором это было сделано' })
  service: string;

  /**
   * Логин администратора, который выполнил действие. Возможно, это может быть null.
   */
  @Column({
    comment: 'Логин администратора, который сделал действие',
    nullable: true,
  })
  admin: string;

  /**
   * Описание действия в журнале.
   */
  @Column({ comment: 'Действие (описание)' })
  text: string;

  /**
   * Дата и время создания записи.
   */
  @CreateDateColumn({
    type: 'timestamptz',
    comment: 'Дата лога',
    default: () => 'NOW()',
  })
  registred: Date;

  /**
   * Дополнительные данные, связанные с действием.
   */
  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Дополнительные данные, связанные с действием',
  })
  additionalData: Record<string, any> | Array<Record<string, any>>;
}
