import { BaseEntity } from '../base/base-entity';
import { ICheck } from './checks.interface';
import { Entity, Column } from 'typeorm';

@Entity()
export class ChecksData extends BaseEntity implements ICheck {
  @Column({ type: 'bigint', comment: 'ID телеграмм чата' })
  chatId: number;

  @Column({ comment: 'Текстовый код чека' })
  qrText: string;

  @Column({
    comment: 'nanoid для распознавания чека',
    nullable: true,
  })
  uuidCheckData: string;

  @Column({
    comment: 'url изображения',
    nullable: true,
  })
  imageUrl: string;
}
