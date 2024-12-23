/**
 * Интерфейс для оборудования клиента (SIM-карты).
 */
export interface IEquipmentClient {
  /**
   * Идентификатор оборудования (SIM-карты).
   */
  id: number;

  /**
   * Тип оборудования (например, GSM).
   */
  type: string;

  /**
   * ICC ID SIM-карты (номер).
   */
  iccId: string;

  /**
   * IMSI SIM-карты.
   */
  imsi: string;

  /**
   * Статус SIM-карты (например, Активирована).
   */
  state: string;
}
