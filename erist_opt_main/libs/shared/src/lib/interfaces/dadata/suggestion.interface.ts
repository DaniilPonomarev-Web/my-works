export interface IAddressData {
  postal_code: string; // Почтовый индекс
  country: string; // Страна
  country_iso_code: string; // ISO код страны
  federal_district: string; // Федеральный округ
  region_fias_id: string; // FIAS ID региона
  region_kladr_id: string; // KLADR ID региона
  region_iso_code: string; // ISO код региона
  region_with_type: string; // Полное название региона с типом
  region_type: string; // Тип региона
  region_type_full: string; // Полное название типа региона
  region: string; // Название региона
  city_fias_id: string; // FIAS ID города
  city_kladr_id: string; // KLADR ID города
  city_with_type: string; // Полное название города с типом
  city_type: string; // Тип города
  city_type_full: string; // Полное название типа города
  city: string; // Название города
  fias_id: string; // FIAS ID
  fias_code: string; // FIAS код
  fias_level: string; // Уровень FIAS
  fias_actuality_state: string; // Состояние актуальности FIAS
  kladr_id: string; // KLADR ID
  geo_lat: string; // Географическая широта
  geo_lon: string; // Географическая долгота
  timezone: string; // Временная зона
}

export interface IFio {
  surname: string; // Фамилия
  name: string; // Имя
  patronymic: string; // Отчество
  gender: string | null; // Пол (может быть null)
  source: string | null; // Источник (может быть null)
  qc: string | null; // QC (может быть null)
}

export interface IState {
  status: string; // Статус (например, ACTIVE)
  code: string | null; // Код статуса (может быть null)
  actuality_date: number; // Дата актуальности (в миллисекундах)
  registration_date: number; // Дата регистрации (в миллисекундах)
  liquidation_date: number | null; // Дата ликвидации (может быть null)
}

export interface IOpf {
  type: string; // Тип ОПФ
  code: string; // Код ОПФ
  full: string; // Полное название ОПФ
  short: string; // Сокращенное название ОПФ
}

export interface IName {
  full_with_opf: string; // Полное название с ОПФ
  short_with_opf: string; // Краткое название с ОПФ
  latin: string | null; // Латинское название (может быть null)
  full: string; // Полное название
  short: string | null; // Краткое название (может быть null)
}

export interface IAddress {
  value: string; // Адрес в текстовом формате
  unrestricted_value: string; // Полный адрес
  invalidity: string | null; // Неверность адреса (может быть null)
  data: IAddressData; // Дополнительные данные об адресе
}

export interface DadataResponse {
  suggestions: {
    value: string; // Значение предложения
    unrestricted_value: string; // Полное значение предложения
    data: object; // Данные предложения (включает Fio, State и другие поля)
  }[];
}

export interface IOrganizationData {
  citizenship: string | null; // Гражданство (может быть null)
  fio: IFio; // ФИО
  source: string | null; // Источник (может быть null)
  qc: string | null; // QC (может быть null)
  hid: string; // ID
  type: string; // Тип (например, INDIVIDUAL)
  state: IState; // Состояние
  opf: IOpf; // ОПФ
  name: IName; // Название
  inn: string; // ИНН
  ogrn: string; // ОГРН
  okpo: string; // ОКПО
  okato: string; // ОКАТО
  oktmo: string; // ОКТМО
  okogu: string; // ОКОГУ
  okfs: string; // ОКФС
  okved: string; // ОКВЭД
  okveds: string | null; // ОКВЭДы (может быть null)
  authorities: string | null; // Органы власти (может быть null)
  documents: string | null; // Документы (может быть null)
  licenses: string | null; // Лицензии (может быть null)
  finance: string | null; // Финансовые данные (может быть null)
  address: IAddress; // Адрес
  phones: string | null; // Телефоны (может быть null)
  emails: string | null; // Электронные адреса (может быть null)
  ogrn_date: number; // Дата ОГРН (в миллисекундах)
  okved_type: string; // Тип ОКВЭД
  employee_count: string | null; // Количество сотрудников (может быть null)
}
