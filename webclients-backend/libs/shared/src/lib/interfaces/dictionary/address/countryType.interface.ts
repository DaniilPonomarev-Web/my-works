/**
 * @interface ICountryType
 * @description Представляет тип страны.
 */
export interface ICountryType {
  id: number; // Идентификатор типа страны
  name: string; // Название типа страны
}

/**
 * @interface ICountryTypesResponse
 * @description Структура ответа, содержащая список типов стран.
 */
export interface ICountryTypesResponse {
  /**
   * Массив объектов типов стран.
   */
  countries: ICountryType[];
}
