import { SN } from '../../../types';

/**
 * @interface IStreetType
 * @description Представляет тип улицы.
 */
export interface IStreetType {
  /**
   * Идентификатор типа улицы
   */
  id: number;
  /**
   * Название типа улицы
   */
  name: SN;
}

/**
 * @interface IStreetTypesResponse
 * @description Структура ответа, содержащая список типов улиц.
 */
export interface IStreetTypesResponse {
  /**
   * Массив объектов типов улиц.
   */
  streetType: IStreetType[];
}
