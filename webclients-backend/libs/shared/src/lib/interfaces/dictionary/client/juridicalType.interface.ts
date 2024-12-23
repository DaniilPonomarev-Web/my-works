/**
 * @interface IJuridicalType
 * @description Представляет тип юридического лица.
 */
export interface IJuridicalType {
  /**
   * Идентификатор типа юридического лица.
   */
  id: number;

  /**
   * Название типа юридического лица.
   */
  name: string;
}

/**
 * @interface IJuridicalTypesResponse
 * @description Массив объектов типов юридических лиц.
 */
export interface IJuridicalTypesResponse {
  /**
   * Массив объектов типов юридических лиц.
   */
  juridicalTypes: IJuridicalType[];
}
