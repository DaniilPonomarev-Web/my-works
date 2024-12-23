import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IInformation } from '../interface/information.interface';

@Entity()
export class Information extends BaseEntity implements IInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  status: boolean;

  constructor(
    id: string,
    name: string,
    title: string,
    content: string,
    status: boolean
  ) {
    super();
    this.id = id;
    this.name = name;
    this.title = title;
    this.content = content;
    this.status = status;
  }
}
