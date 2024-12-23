/**
 * @interface IJournal
 * @description Описание записи журнала.
 */
export interface IJournal {
  /**
   * Уникальный идентификатор записи журнала.
   */
  id: string;

  /**
   * Название сервиса, к которому относится запись.
   */
  service: string;

  /**
   * Логин админа, который создал запись.
   */
  admin: string;

  /**
   * Текст записи журнала.
   */
  text: string;

  /**
   * Дата и время регистрации записи.
   */
  registred: Date;

  /**
   * Дополнительные данные, если есть.
   */
  additionalData?: Record<string, any> | Array<Record<string, any>>;
}

/**
 * @interface ISearchJournal
 * @description Параметры для поиска записей в журнале.
 */
export interface ISearchJournal {
  /**
   * Фильтр по названию сервиса (необязательный).
   */
  service?: string;

  /**
   * Логин админа для фильтрации записей (необязательный).
   */
  admin?: string;

  /**
   * Дата начала фильтрации (формат: "2024-08-16T00:00:00Z", необязательный).
   */
  fromDate?: string;

  /**
   * Дата окончания фильтрации (формат: "2024-08-17T23:59:59Z", необязательный).
   */
  toDate?: string;

  /**
   * Заголовок для фильтрации записей (необязательный).
   */
  title?: string;

  /**
   * Идентификатор данных для фильтрации записей (необязательный).
   */
  dataId?: string;
}

/**
 * @interface ICreateJournal
 * @description Описание структуры данных для создания новой записи в журнале.
 */
export interface ICreateJournal {
  /**
   * Название сервиса, к которому будет относиться новая запись.
   */
  service: string;

  /**
   * Логин админа, создающего запись.
   */
  admin: string;

  /**
   * Текст записи журнала.
   */
  text: string;

  /**
   * Дополнительные данные, если есть.
   */
  additionalData?: Record<string, any> | Array<Record<string, any>>;
}
