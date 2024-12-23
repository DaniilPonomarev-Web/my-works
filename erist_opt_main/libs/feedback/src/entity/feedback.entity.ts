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
import { IFeedBack } from '../interface/feedback.interface';
import { User } from '@erist-opt/shared';

@Entity()
@Index(['id'])
export class FeedBack extends BaseEntity implements IFeedBack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ comment: 'Текст запроса', default: 'Пустой запрос' })
  text: string;

  @Column({ comment: 'Статус открыт|закрыт', default: false })
  status: boolean;

  @CreateDateColumn({ type: 'timestamptz', comment: 'Дата создания запроса' })
  registred: Date;

  @UpdateDateColumn({ type: 'timestamptz', comment: 'Дата обновления запроса' })
  updated: Date;
}
