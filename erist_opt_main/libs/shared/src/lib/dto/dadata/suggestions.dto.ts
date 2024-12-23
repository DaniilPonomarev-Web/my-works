import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  DadataResponse,
  IAddress,
  IAddressData,
  IFio,
  IName,
  IOpf,
  IOrganizationData,
  IState,
} from '../../interfaces';

@ObjectType({ description: 'Дополнительные данные об адресе' })
class AddressData implements IAddressData {
  @Field({ description: 'Почтовый индекс', nullable: true })
  postal_code: string;

  @Field({ description: 'Страна', nullable: true })
  country: string;

  @Field({ description: 'ISO код страны', nullable: true })
  country_iso_code: string;

  @Field({ description: 'Федеральный округ', nullable: true })
  federal_district: string;

  @Field({ description: 'FIAS ID региона', nullable: true })
  region_fias_id: string;

  @Field({ description: 'KLADR ID региона', nullable: true })
  region_kladr_id: string;

  @Field({ description: 'ISO код региона', nullable: true })
  region_iso_code: string;

  @Field({ description: 'Полное название региона с типом', nullable: true })
  region_with_type: string;

  @Field({ description: 'Тип региона', nullable: true })
  region_type: string;

  @Field({ description: 'Полное название типа региона', nullable: true })
  region_type_full: string;

  @Field({ description: 'Название региона', nullable: true })
  region: string;

  @Field({ description: 'FIAS ID города', nullable: true })
  city_fias_id: string;

  @Field({ description: 'KLADR ID города', nullable: true })
  city_kladr_id: string;

  @Field({ description: 'Полное название города с типом', nullable: true })
  city_with_type: string;

  @Field({ description: 'Тип города', nullable: true })
  city_type: string;

  @Field({ description: 'Полное название типа города', nullable: true })
  city_type_full: string;

  @Field({ description: 'Название города', nullable: true })
  city: string;

  @Field({ description: 'FIAS ID', nullable: true })
  fias_id: string;

  @Field({ description: 'FIAS код', nullable: true })
  fias_code: string;

  @Field({ description: 'Уровень FIAS', nullable: true })
  fias_level: string;

  @Field({ description: 'Состояние актуальности FIAS', nullable: true })
  fias_actuality_state: string;

  @Field({ description: 'KLADR ID', nullable: true })
  kladr_id: string;

  @Field({ description: 'Географическая широта', nullable: true })
  geo_lat: string;

  @Field({ description: 'Географическая долгота', nullable: true })
  geo_lon: string;

  @Field({ description: 'Временная зона', nullable: true })
  timezone: string;
}

@ObjectType({ description: 'ФИО' })
class Fio implements IFio {
  @Field({ description: 'Фамилия' })
  surname: string;

  @Field({ description: 'Имя' })
  name: string;

  @Field({ description: 'Отчество' })
  patronymic: string;

  @Field({ description: 'Пол (может быть null)', nullable: true })
  gender: string;

  @Field({ description: 'Источник (может быть null)', nullable: true })
  source: string;

  @Field({ description: 'QC (может быть null)', nullable: true })
  qc: string;
}

@ObjectType({ description: 'Состояние' })
class State implements IState {
  @Field({ description: 'Статус (например, ACTIVE)', nullable: true })
  status: string;

  @Field({ description: 'Код статуса (может быть null)', nullable: true })
  code: string;

  @Field(() => Float, {
    description: 'Дата актуальности (в миллисекундах)',
    nullable: true,
  })
  actuality_date: number;

  @Field(() => Float, {
    description: 'Дата регистрации (в миллисекундах)',
    nullable: true,
  })
  registration_date: number;

  @Field({ description: 'Дата ликвидации (может быть null)', nullable: true })
  liquidation_date: number;
}

@ObjectType({ description: 'ОПФ' })
class Opf implements IOpf {
  @Field({ description: 'Тип ОПФ', nullable: true })
  type: string;

  @Field({ description: 'Код ОПФ', nullable: true })
  code: string;

  @Field({ description: 'Полное название ОПФ', nullable: true })
  full: string;

  @Field({ description: 'Сокращенное название ОПФ', nullable: true })
  short: string;
}

@ObjectType({ description: 'Название' })
class Name implements IName {
  @Field({ description: 'Полное название с ОПФ', nullable: true })
  full_with_opf: string;

  @Field({ description: 'Краткое название с ОПФ', nullable: true })
  short_with_opf: string;

  @Field({
    description: 'Латинское название (может быть null)',
    nullable: true,
  })
  latin: string;

  @Field({ description: 'Полное название', nullable: true })
  full: string;

  @Field({ description: 'Краткое название (может быть null)', nullable: true })
  short: string;
}

@ObjectType({ description: 'Адрес' })
class Address implements IAddress {
  @Field({ description: 'Адрес в текстовом формате', nullable: true })
  value: string;

  @Field({ description: 'Полный адрес', nullable: true })
  unrestricted_value: string;

  @Field({ description: 'Неверность адреса (может быть null)', nullable: true })
  invalidity: string;

  @Field(() => AddressData, {
    description: 'Дополнительные данные об адресе',
    nullable: true,
  })
  data: AddressData;
}

@ObjectType({ description: 'Предложение Dadata' })
class DadataSuggestion {
  @Field({ description: 'Значение предложения', nullable: true })
  value: string;

  @Field({ description: 'Полное значение предложения', nullable: true })
  unrestricted_value: string;

  @Field(() => AddressData, {
    description: 'Данные предложения (включает Fio, State и другие поля)',
    nullable: true,
  })
  data: AddressData;
}

@ObjectType({ description: 'Ответ от Dadata' })
export class DadataResponseDTO implements DadataResponse {
  @Field(() => [DadataSuggestion], { description: 'Список предложений' })
  suggestions: DadataSuggestion[];
}

@ObjectType({ description: 'Данные организации' })
export class OrganizationData implements IOrganizationData {
  @Field({ description: 'Гражданство (может быть null)', nullable: true })
  citizenship: string;

  @Field(() => Fio, { description: 'ФИО', nullable: true })
  fio: Fio;

  @Field({ description: 'Источник (может быть null)', nullable: true })
  source: string;

  @Field({ description: 'QC (может быть null)', nullable: true })
  qc: string;

  @Field({ description: 'ID', nullable: true })
  hid: string;

  @Field({ description: 'Тип (например, INDIVIDUAL)', nullable: true })
  type: string;

  @Field(() => State, { description: 'Состояние', nullable: true })
  state: State;

  @Field(() => Opf, { description: 'ОПФ', nullable: true })
  opf: Opf;

  @Field(() => Name, { description: 'Название', nullable: true })
  name: Name;

  @Field({ description: 'ИНН', nullable: true })
  inn: string;

  @Field({ description: 'ОГРН', nullable: true })
  ogrn: string;

  @Field({ description: 'ОКПО', nullable: true })
  okpo: string;

  @Field({ description: 'ОКАТО', nullable: true })
  okato: string;

  @Field({ description: 'ОКТМО', nullable: true })
  oktmo: string;

  @Field({ description: 'ОКОГУ', nullable: true })
  okogu: string;

  @Field({ description: 'ОКФС', nullable: true })
  okfs: string;

  @Field({ description: 'ОКВЭД', nullable: true })
  okved: string;

  @Field({ description: 'ОКВЭДы (может быть null)', nullable: true })
  okveds: string;

  @Field({ description: 'Органы власти (может быть null)', nullable: true })
  authorities: string;

  @Field({ description: 'Документы (может быть null)', nullable: true })
  documents: string;

  @Field({ description: 'Лицензии (может быть null)', nullable: true })
  licenses: string;

  @Field({ description: 'Финансовые данные (может быть null)', nullable: true })
  finance: string;

  @Field(() => Address, { description: 'Адрес', nullable: true })
  address: Address;

  @Field({ description: 'Телефоны (может быть null)', nullable: true })
  phones: string;

  @Field({
    description: 'Электронные адреса (может быть null)',
    nullable: true,
  })
  emails: string;

  @Field(() => Float, {
    description: 'Дата ОГРН (в миллисекундах)',
    nullable: true,
  })
  ogrn_date: number;

  @Field({ description: 'Тип ОКВЭД', nullable: true })
  okved_type: string;

  @Field({
    description: 'Количество сотрудников (может быть null)',
    nullable: true,
  })
  employee_count: string;
}

@ObjectType({ description: 'Основной DTO для данных Dadata' })
export class DadataDataDTO {
  @Field({ description: 'Гражданство (может быть null)', nullable: true })
  citizenship: string;

  @Field(() => Fio, { description: 'ФИО', nullable: true })
  fio: Fio;

  @Field({ description: 'Источник (может быть null)', nullable: true })
  source: string;

  @Field({ description: 'QC (может быть null)', nullable: true })
  qc: string;

  @Field({ description: 'HID', nullable: true })
  hid: string;

  @Field({ description: 'Тип', nullable: true })
  type: string;

  @Field(() => State, { description: 'Состояние', nullable: true })
  state: State;

  @Field(() => Opf, { description: 'ОПФ', nullable: true })
  opf: Opf;

  @Field(() => Name, { description: 'Название', nullable: true })
  name: Name;

  @Field({ description: 'ИНН', nullable: true })
  inn: string;

  @Field({ description: 'ОГРН', nullable: true })
  ogrn: string;

  @Field({ description: 'ОКПО', nullable: true })
  okpo: string;

  @Field({ description: 'ОКАТО', nullable: true })
  okato: string;

  @Field({ description: 'ОКТМО', nullable: true })
  oktmo: string;

  @Field({ description: 'ОКОГУ', nullable: true })
  okogu: string;

  @Field({ description: 'ОКФС', nullable: true })
  okfs: string;

  @Field({ description: 'ОКВЭД', nullable: true })
  okved: string;

  @Field({ description: 'ОКВЭДs (может быть null)', nullable: true })
  okveds: string;

  @Field({ description: 'Власти (может быть null)', nullable: true })
  authorities: string;

  @Field({ description: 'Документы (может быть null)', nullable: true })
  documents: string;

  @Field({ description: 'Лицензии (может быть null)', nullable: true })
  licenses: string;

  @Field({
    description: 'Финансовая информация (может быть null)',
    nullable: true,
  })
  finance: string;

  @Field(() => DadataSuggestion, { description: 'Адрес', nullable: true })
  address: DadataSuggestion;

  @Field({ description: 'Телефоны (может быть null)', nullable: true })
  phones: string;

  @Field({
    description: 'Электронные адреса (может быть null)',
    nullable: true,
  })
  emails: string;

  @Field({ description: 'Дата ОГРН', nullable: true })
  ogrn_date: number;

  @Field({ description: 'Тип ОКВЭД', nullable: true })
  okved_type: string;

  @Field({
    description: 'Количество сотрудников (может быть null)',
    nullable: true,
  })
  employee_count: string;
}
