import { ObjectType, Field, Float } from '@nestjs/graphql';
import { IClientSearch } from '../../interfaces';
import { PassportClientSearchDTO } from './passport.dto';

import { NN, SN } from '../../types';

// @ObjectType()
// export class ClientApiMeDTO implements IClientSearchResult {
//   @Field(() => Int, { description: 'Идентификатор клиента' })
//   id: number;

//   @Field(() => BalanceClientSearchDTO, { description: 'Баланс клиента' })
//   balance: BalanceClientSearchDTO;

//   @Field(() => String, {
//     description: 'Тип клиента (например, Корпоративный или Кредит)',
//   })
//   clientType: string;

//   @Field(() => String, {
//     description: 'Тип юридического лица (например, Физическое лицо)',
//   })
//   juridicalType: string;

//   @Field(() => NameClientSearchDTO, {
//     description: 'Имя клиента (структурированное и неструктурированное)',
//   })
//   name: NameClientSearchDTO;

//   @Field(() => String, { description: 'Дата рождения клиента' })
//   birthDate: string;

//   @Field(() => DocumentClientSearchDTO, {
//     description: 'Документ клиента (например, паспорт)',
//   })
//   document: DocumentClientSearchDTO;

//   @Field(() => Int, { description: 'Номер лицевого счета клиента' })
//   account: number;

//   @Field(() => String, { description: 'Номер договора клиента' })
//   contractNumber: string;

//   @Field(() => String, {
//     description: 'Состояние клиента (например, Активен или Блокирован)',
//   })
//   state: string;

//   @Field(() => [SubscriberClientSearchDTO], {
//     description: 'Список абонентов клиента',
//   })
//   subscribers: SubscriberClientSearchDTO[];
// }

/**
 * `ClientDataDTO` - объектный тип для представления данных клиента.
 * Содержит всю информацию о клиенте, включая персональные данные, контакты, баланс, паспортные данные и другие.
 */
@ObjectType({ description: 'Объектный тип для представления данных клиента.' })
export class ClientDataDTO implements IClientSearch {
  @Field(() => String, {
    description: 'Полное имя клиента (ФИО)',
    nullable: true,
  })
  fio: SN;

  @Field(() => Number, {
    nullable: true,
    description: 'Номер телефона клиента (MSISDN)',
  })
  msisdn: NN;

  @Field(() => Float, { nullable: true, description: 'Баланс клиента' })
  balance: NN;

  @Field(() => String, {
    nullable: true,
    description: 'Дата рождения клиента в формате YYYY-MM-DD',
  })
  birthDate: string;

  @Field(() => PassportClientSearchDTO, {
    description: 'Данные паспорта клиента',
    nullable: true,
  })
  passport: PassportClientSearchDTO;

  @Field(() => Number, {
    nullable: true,
    description: 'Дополнительный номер телефона клиента (если есть)',
  })
  additionalPhone: NN;

  @Field(() => String, {
    nullable: true,
    description: 'Регион проживания клиента',
  })
  region: SN;

  @Field(() => Number, {
    nullable: true,
    description: 'ICCID сим-карты клиента',
  })
  iccId: NN;

  @Field(() => Number, { description: 'Лицевой счет клиента' })
  account: number;

  @Field(() => String, { description: 'Номер договора клиента' })
  contractNumber: string;

  @Field(() => String, {
    description: 'Сегмент клиента (например, Корпоративный, Индивидуальный)',
  })
  segment: string;

  @Field(() => String, {
    description: 'Статус клиента',
  })
  state: string;

  @Field(() => String, {
    description: 'Юридический тип клиента',
  })
  juridicalType: string;

  constructor(
    fio: SN,
    msisdn: NN,
    birthDate: string,
    balance: NN,
    passport: PassportClientSearchDTO,
    additionalPhone: NN,
    region: SN,
    iccId: NN,
    account: number,
    juridicalType: string,
    contractNumber: string,
    segment: string,
    state: string
  ) {
    this.fio = fio;
    this.msisdn = msisdn;
    this.birthDate = birthDate;
    this.balance = balance;
    this.passport = passport;
    this.additionalPhone = additionalPhone;
    this.region = region;
    this.iccId = iccId;
    this.account = account;
    this.contractNumber = contractNumber;
    this.segment = segment;
    this.state = state;
    this.juridicalType = juridicalType;
  }
}
