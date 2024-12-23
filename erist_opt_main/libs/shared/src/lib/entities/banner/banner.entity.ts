import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IBanner } from '../../interfaces';

@Entity()
@Index(['id'])
@Index(['status'])
export class Banner implements IBanner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, comment: 'Название баннера' })
  name: string;

  @Column({ default: false, comment: 'Статус баннера' })
  status: boolean;

  @Column({ nullable: true, comment: 'Заголовок на баннере' })
  title: string;

  @Column({ nullable: true, comment: 'Ссылка на баннере' })
  link: string;

  @Column({ nullable: false, comment: 'Изображение для десктопа' })
  image: string;

  @Column({ nullable: false, comment: 'Изображение для мобилки' })
  image_mob: string;

  @Column({
    nullable: false,
    comment: 'Изображение для десктопа ссылка на minio',
  })
  image_href: string;

  @Column({
    nullable: false,
    comment: 'Изображение для мобилки ссылка на minio',
  })
  image_mob_href: string;

  constructor(
    id: string,
    name: string,
    status: boolean,
    title: string,
    link: string,
    image: string,
    image_mob: string
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.title = title;
    this.link = link;
    this.image = image;
    this.image_mob = image_mob;
  }
}
