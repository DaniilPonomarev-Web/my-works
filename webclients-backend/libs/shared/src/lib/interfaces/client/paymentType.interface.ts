/**
 * Интерфейс для типа оплаты клиента.
 */
export interface IPaymentTypeClient {
  /**
   * Идентификатор типа оплаты.
   */
  id: number;

  /**
   * Название типа оплаты.
   */
  name: string;
}
