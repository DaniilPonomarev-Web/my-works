import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { ILogAdmin } from '../../interfaces';

@Entity({ name: 'logs-admin' })
@Index(['id'])
export class LogsAdmin extends BaseEntity implements ILogAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'Сервис в котром это сделано' })
  service: string;

  @Column({ comment: 'Логин адимнка который сделал действие', nullable: true })
  admin: string;

  @Column({ comment: 'Действие (описание)' })
  text: string;

  @CreateDateColumn({
    type: 'timestamptz',
    comment: 'Дата лога',
    default: () => 'NOW()',
  })
  registred: Date;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Дополнительные данные, связанные с логом',
  })
  additionalData: Record<string, any> | Array<Record<string, any>>;
}
