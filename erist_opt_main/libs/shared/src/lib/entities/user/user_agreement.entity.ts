import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeUpdate,
} from 'typeorm';
import { IUserAgreement } from '../../interfaces';

@Entity()
export class UserAgreement extends BaseEntity implements IUserAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    comment: 'Дата подписания',
    default: null,
  })
  date: Date;

  @Column({
    nullable: false,
    comment: 'Подписан или нет',
    default: false,
  })
  signed: boolean;

  @BeforeUpdate()
  updateDate() {
    this.date = new Date();
  }
  // constructor(id: string, date: Date, signed: boolean) {
  //   super();
  //   this.id = id;
  //   this.date = date;
  //   this.signed = signed;
  // }
}
