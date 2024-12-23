import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { IAnswerQuestion } from '../../interfaces';

@Entity()
export class AnswerQuestion implements IAnswerQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false, length: 255, comment: 'Вопрос'})
  question: string;

  @Column({type: 'text', nullable: false, comment: 'Ответ'})
  answer: string;

  @Column({type: 'boolean', default: true})
  status: boolean;

  @Column({type: 'int', default: 0, comment: 'Порядковый номер'})
  sort: number;

  constructor(id: string, question: string, answer: string, status: boolean, sort: number) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.status = status;
    this.sort = sort;
  }
}
