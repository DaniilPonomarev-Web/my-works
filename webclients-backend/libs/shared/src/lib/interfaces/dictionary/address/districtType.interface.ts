import { SN } from '../../../types';

/**
 * @interface IDistrictType
 * @description Представляет тип района.
 */
export interface IDistrictType {
  /*
   * Идентификатор типа района
   */
  id: number;
  /*
   * Название типа района.
   */
  name: SN;
}

/**
 * @interface IDistrictTypesResponse
 * @description Структура ответа, содержащая список типов районов.
 */
export interface IDistrictTypesResponse {
  /**
   * Массив объектов типов районов.
   */
  districtTypes: IDistrictType[];
}
