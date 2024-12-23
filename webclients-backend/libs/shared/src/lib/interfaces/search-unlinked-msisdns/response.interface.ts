/**
 * Интерфейс для состояния MSISDN.
 */
export interface IState {
  /**
   * Уникальный идентификатор состояния.
   */
  id: number;

  /**
   * Название состояния.
   */
  name: string;

  /**
   * Дата и время изменения состояния.
   */
  changedAt: string;
}

/**
 * Интерфейс для категории MSISDN.
 */
export interface ICategory {
  /**
   * Уникальный идентификатор категории.
   */
  id: number;

  /**
   * Название категории.
   */
  name: string;
}

/**
 * Интерфейс для региона MSISDN.
 */
export interface IRegion {
  /**
   * Уникальный идентификатор региона.
   */
  id: number;

  /**
   * Название региона.
   */
  name: string;
}

/**
 * Интерфейс для MSISDN объекта.
 */
export interface IMsisdn {
  /**
   * Уникальный идентификатор MSISDN.
   */
  id: number;

  /**
   * Сам номер MSISDN.
   */
  msisdn: number;

  /**
   * Комментарий к MSISDN.
   * Поле необязательное.
   */
  comment?: string;

  /**
   * Состояние MSISDN.
   */
  state: IState;

  /**
   * Категория MSISDN.
   */
  category: ICategory;

  /**
   * Регион MSISDN.
   */
  region: IRegion;
}

/**
 * Интерфейс для ответа поиска свободных MSISDN.
 */
export interface ISearchUnlinkedMsisdnsResponse {
  /**
   * Список MSISDN, соответствующих условиям поиска.
   * Может содержать `null` для некоторых записей.
   */
  msisdns: (IMsisdn | null)[];
}
