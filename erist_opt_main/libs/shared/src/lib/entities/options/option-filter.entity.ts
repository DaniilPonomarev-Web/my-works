import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IOptionFilter } from '../../interfaces';

@Entity({ name: 'option_filter' })
export class OptionFilter extends BaseEntity implements IOptionFilter {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  id: string;

  @Column({ comment: 'Название опции (размер цвет и прочая)' })
  optionName: string;

  @Column('simple-array', { comment: 'Актуальные значения' })
  values: string[];
}
