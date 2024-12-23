import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ISynonymGroup } from '../../interfaces';

@Entity()
export class SynonymGroup implements ISynonymGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'синонимы' })
  synonyms: string;
}
