/**
 * Интерфейс для представления типа адреса.
 */
export interface IAddressType {
  /**
   * Идентификатор типа адреса.
   */
  id: number;

  /**
   * Название типа адреса.
   */
  name: string;

  /**
   * Описание типа адреса.
   */
  description: string;

  /**
   * Идентификатор юридического типа, к которому относится адрес.
   */
  juridicalTypeId: number;
}

/**
 * Интерфейс для ответа, содержащего массив типов адресов.
 */
export interface IAddressTypesResponse {
  /**
   * Массив типов адресов.
   */
  addressTypes: IAddressType[];
}
