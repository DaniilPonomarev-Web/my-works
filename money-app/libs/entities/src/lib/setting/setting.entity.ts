import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base-entity';
import { ISetting } from './setting.interface';

@Entity()
export class Setting extends BaseEntity implements ISetting {
  @Column({ unique: true, comment: 'идентификатор' })
  key: string;

  @Column('jsonb', { comment: 'Настройки' })
  value: any;
}
