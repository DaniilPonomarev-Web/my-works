import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IUserCompany } from '../../interfaces';

@Entity()
export class UserCompany extends BaseEntity implements IUserCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'Наименование компании', nullable: false })
  name: string;

  @Column({ comment: 'Юр. Адрес', nullable: false })
  urAddress: string;

  @Column({ comment: 'ИНН', nullable: false, unique: true })
  inn: string;

  @Column({ comment: 'КПП', nullable: true })
  kpp: string;

  @Column({ comment: 'ОГРН(-ИП)', nullable: true, unique: true })
  ogrn: string;

  @Column({ comment: 'расчетный счет', nullable: false })
  checkingAccount: string;

  @Column({ comment: 'Название банка', nullable: false })
  bankName: string;

  @Column({ comment: 'БИК банка', nullable: false })
  bikBank: string;

  @Column({ comment: 'корреспондентский счет', nullable: false })
  correspondentAccount: string;

  constructor(
    id: string,
    name: string,
    urAddress: string,
    inn: string,
    kpp: string,
    ogrn: string,
    checkingAccount: string,
    bankName: string,
    bikBank: string,
    correspondentAccount: string
  ) {
    super();
    this.id = id;
    this.name = name;
    this.urAddress = urAddress;
    this.inn = inn;
    this.kpp = kpp;
    this.ogrn = ogrn;
    this.checkingAccount = checkingAccount;
    this.bankName = bankName;
    this.bikBank = bikBank;
    this.correspondentAccount = correspondentAccount;
  }
}
