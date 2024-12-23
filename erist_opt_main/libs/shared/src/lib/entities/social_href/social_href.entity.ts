import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ISocialHref } from '../../interfaces';

@Entity({ name: 'social_href_entity' })
export class SocialHref extends BaseEntity implements ISocialHref {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: 'По большей части тэг, типа vk, inst, telegram, wa и тд',
    nullable: false,
  })
  name: string;

  @Column({ comment: 'Ссылка на соц сеть', nullable: false })
  href: string;

  @Column({ comment: 'Порядок сортировки', nullable: false, default: 100 })
  sortOrder: number;

  constructor(id: string, name: string, href: string, sortOrder: number) {
    super();
    this.id = id;
    this.name = name;
    this.href = href;
    this.sortOrder = sortOrder;
  }
}
