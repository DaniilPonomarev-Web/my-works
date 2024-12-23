import { SN } from '../../../types';

/**
 * @interface IRegionType
 * @description Представляет тип региона абонента.
 */
export interface IRegionType {
  /*
   * Идентификатор региона абонента (branch_id из phone_history)
   */
  id: number;
  /**
   *  Название региона абонента
   */
  name: SN;
}

/**
 * @interface IRegionTypesResponse
 * @description Структура ответа, содержащая список типов регионов.
 */
export interface IRegionTypesResponse {
  /**
   * Массив объектов типов регионов.
   */
  regionTypes: IRegionType[];
}
