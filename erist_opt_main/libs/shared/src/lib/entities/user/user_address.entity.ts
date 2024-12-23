import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { IUserAddress } from '../../interfaces';
import { User } from './user.entity';

@Entity()
export class UserAddress extends BaseEntity implements IUserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'Страна', default: 'Россия' })
  country: string;

  @Column({ comment: 'Город' })
  city: string;

  @Column({ comment: 'Улица' })
  street: string;

  @Column({ comment: 'Номер дома' })
  home: string;

  @Column({ comment: 'Номер офиса или квартира' })
  apartmentORoffice: string;

  // @ManyToOne(() => User, (user) => user.addresses)
  // user: User;

  constructor(
    id: string,
    country: string,
    city: string,
    street: string,
    home: string,
    apartmentORoffice: string,
    user: User
  ) {
    super();
    this.id = id;
    this.country = country;
    this.city = city;
    this.street = street;
    this.home = home;
    this.apartmentORoffice = apartmentORoffice;
    // this.user = user;
  }
}
