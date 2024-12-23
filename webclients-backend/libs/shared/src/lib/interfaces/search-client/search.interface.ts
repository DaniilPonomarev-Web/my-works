import { NN, SN, StateType } from '../../types';
import { JuridicalType } from '../../types/client/juridical.type';
import { SegmentType } from '../../types/client/segment.type';
import { IAccessTokenInput } from '../apimeInputs';
import { IBalanceClient } from '../client';

/**
 * @interface ISearchClientPayload
 * @description Payload для поиска клиента.
 */
export interface ISearchClientPayload {
  /**
   * Данные для авторизации токен и ))))
   */
  tokenInput: IAccessTokenInput;

  /**
   * Входное значение для поиска клиента. Может быть строкой (например, ФИО) или числом (например, номер телефона или дгн и еще что угодно).
   */
  input: string | number;
}

/**
 * @interface IQueryStructured
 * @description Интерфейс для структурированного запроса на поиск клиента.
 */
export interface IQueryStructured {
  /**
   * Структурированные данные о клиенте, или `null`, если такие данные отсутствуют.
   */
  structured: IStructuredNameClientSearch | null;
}

/**
 * @interface IQueryUnStructured
 * @description Интерфейс для структуры запроса с неструктурированными данными ФИО клиента.
 */
export interface IQueryUnStructured {
  /**
   * Неструктурированные данные, представляющие собой строку или другой тип данных, необходимые для ФИО клиента.
   */
  unstructured: SN;
}

/**
 * @interface IStructuredNameClientSearch
 * @description Интерфейс для структурированных данных о поиске клиента по имени.
 */
export interface IStructuredNameClientSearch {
  /**
   * Имя клиента.
   */
  first_name: string;

  /**
   * Отчество клиента.
   */
  middle_name: string;

  /**
   * Фамилия клиента.
   */
  last_name: string;

  /**
   * Название организации (не используется, всегда `never`).
   */
  orgName?: never;
}

/**
 * @interface INameClientSearch
 * @description Интерфейс для поиска клиента по имени.
 */
export interface INameClientSearch {
  /**
   * Структурированные данные о клиенте.
   */
  structured: IStructuredClientName;

  /**
   * Строка с необработанным именем клиента.
   */
  unstructured: string;
}

/**
 * @interface IStructuredClientName
 * @description Структурированные данные о клиенте, включающие имя и организационные данные, если клиент является юридическим лицом.
 */
export interface IStructuredClientName {
  /**
   * Имя клиента.
   */
  firstName: string;

  /**
   * Отчество клиента.
   */
  middleName: string;

  /**
   * Фамилия клиента.
   */
  lastName: string;

  /**
   * Имя организации, если клиент является юридическим лицом.
   * Может быть `null`, если клиент не является юридическим лицом.
   */
  orgName?: string | null;
}

/**
 * @interface IDocumentClientSearch
 * @description Структура данных для поиска клиента по документу.
 */
export interface IDocumentClientSearch {
  /**
   * Тип документа (например, паспорт, водительские права, ИНН).
   */
  type: string;

  /**
   * Серия документа.
   */
  series: string; // docSeries

  /**
   * Номер документа.
   */
  number: string; // docNumber

  /**
   * Дата выдачи документа.
   */
  issueDate: string;
}

/**
 * @interface ISubscriberClientSearch
 * @description Структура данных для поиска клиента по абонентскому номеру.
 */
export interface ISubscriberClientSearch {
  /**
   * Идентификатор абонента.
   */
  id: number;

  /**
   * Абонентский номер (MSISDN).
   */
  msisdn: string;

  /**
   * Регион, в котором зарегистрирован абонент.
   */
  region: string;

  /**
   * Текущий статус абонента (например, активен, заблокирован и т.д.).
   */
  state: string;

  /**
   * Дополнительный городской номер (если доступен).
   */
  additionalPhoneNumber?: string | null;

  /**
   * Данные о оборудовании абонента.
   */
  equipment: IEquipmentClientSearch;
}

/**
 * @interface IEquipmentClientSearch
 * @description Структура данных для поиска оборудования клиента.
 */
export interface IEquipmentClientSearch {
  /**
   * Идентификатор оборудования.
   */
  id: number;

  /**
   * Тип оборудования (например,  хз что).
   */
  type: string;

  /**
   * ICC ID оборудования (уникальный идентификатор SIM-карты).
   */
  iccId: string;

  /**
   * IMSI (International Mobile Subscriber Identity) - уникальный идентификатор мобильного абонента.
   */
  imsi: string;

  /**
   * Текущий статус оборудования (например, активное, заблокировано и т.д.).
   */
  state: string;
}

/**
 * @interface IClientSearchResult
 * @description Структура данных для результата поиска клиента.
 */
export interface IClientSearchResult {
  /**
   * Идентификатор клиента.
   */
  id: number;

  /**
   * Баланс клиента. Может быть `null` если номер закрыт.
   */
  balance: IBalanceClient | null;

  /**
   * Тип клиента (например, массовый рынок, VIP и т.д.).
   */
  clientType: SegmentType;

  /**
   * Тип юридического лица (например, физ. лицо, юр. лицо, ИП и т.д.).
   */
  juridicalType: JuridicalType;

  /**
   * Имя клиента с детализированными данными (структурированное или неструктурированное).
   */
  name: INameClientSearch;

  /**
   * Дата рождения клиента.
   */
  birthDate: string;

  /**
   * Данные документа клиента.
   */
  document: IDocumentClientSearch;

  /**
   * Номер лицевого счета клиента.
   */
  account: number;

  /**
   * Номер договора клиента.
   */
  contractNumber: string;

  /**
   * Текущий статус клиента (например, активен, заблокирован и т.д.).
   */
  state: StateType;

  /**
   * Подписчики клиента. Может содержать `null` если нет информации о подписчиках.
   */
  subscribers: (ISubscriberClientSearch | null)[];
}

/**
 * @interface IClientSearch
 * @description Структура данных для поиска клиента с различными параметрами.
 */
export interface IClientSearch {
  /**
   * Полное имя клиента в структуре.
   */
  fio: SN;

  /**
   * Абонентский номер телефона.
   */
  msisdn: NN;

  /**
   * Баланс клиента.
   */
  balance: NN;

  /**
   * Дата рождения клиента.
   */
  birthDate: SN;

  /**
   * Паспортные данные клиента, включая серию и номер паспорта.
   */
  passport: {
    serialNumber: SN; // Серийный номер паспорта
    date: SN; // Дата выдачи паспорта
  };

  /**
   * Дополнительный городской номер телефона клиента.
   */
  additionalPhone: NN;

  /**
   * Регион клиента.
   */
  region: SN;

  /**
   * ICC ID (International Circuit Card Identifier) Sim-карты клиента.
   */
  iccId: NN;

  /**
   * Номер лицевого счета клиента.
   */
  account: number;

  /**
   * Тип юридического лица (например, физ. лицо, юр. лицо, ИП и т.д.).
   */
  juridicalType: JuridicalType | string;

  /**
   * Номер договора клиента.
   */
  contractNumber: string;

  /**
   * Тип сегмента клиента (например, массовый рынок, VIP и т.д.).
   */
  segment: SegmentType | string;

  /**
   * Текущий статус клиента (например, активен, заблокирован и т.д.).
   */
  state: StateType | string;
}

/**
 * @interface IDataClientSearchResponse
 * @description Структура данных для ответа на запрос поиска клиентов, включая запрос и результаты поиска.
 */
export interface IDataClientSearchResponse {
  /**
   * Запрос в структуре или незавершенном виде.
   */
  query: IQueryStructured | IQueryUnStructured;

  /**
   * Массив объектов с результатами поиска клиентов.
   */
  clients: IClientSearchResult[];
}
