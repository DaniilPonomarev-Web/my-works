/**
 * @interface ICityType
 * @description Представляет тип города.
 */
export interface ICityType {
  id: number; // Идентификатор типа города
  name: string; // Название типа города
}

/**
 * @interface ICityTypesResponse
 * @description Структура ответа, содержащая список типов городов.
 */
export interface ICityTypesResponse {
  /**
   * Массив объектов типов городов.
   */
  cityTypes: ICityType[];
}
