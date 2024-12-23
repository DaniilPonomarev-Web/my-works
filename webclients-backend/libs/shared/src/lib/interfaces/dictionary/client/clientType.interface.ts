/**
 * @interface IClientType
 * @description Представляет тип клиента.
 */
export interface IClientType {
  /**
   * Идентификатор типа клиента.
   */
  id: number;

  /**
   * Название типа клиента.
   */
  name: string;
}

/**
 * @interface IClientTypesResponse
 * @description Массив объектов типов клиентов.
 */
export interface IClientTypesResponse {
  /**
   * Массив объектов типов клиентов.
   */
  clientTypes: IClientType[];
}
