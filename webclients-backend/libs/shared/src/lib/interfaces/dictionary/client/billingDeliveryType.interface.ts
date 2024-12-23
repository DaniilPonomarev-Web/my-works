/**
 * @interface IBillingDeliveryType
 * @description Представляет тип доставки счета.
 */
interface IBillingDeliveryType {
  /**
   * Идентификатор типа доставки счета.
   */
  id: number;

  /**
   * Название типа доставки счета.
   */
  name: string;
}

/**
 * @interface IBillingDeliveryTypesResponse
 * @description Массив объектов типов доставки счетов.
 */
export interface IBillingDeliveryTypesResponse {
  /**
   * Массив объектов типов доставки счетов.
   */
  billingDeliveryTypes: IBillingDeliveryType[];
}
