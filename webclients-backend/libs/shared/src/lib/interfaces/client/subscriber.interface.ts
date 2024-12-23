import { IStateClient } from './state.interface';
import { IEquipmentClient } from './equipment.interface';
import { IRegionType } from '..';

/**
 * Интерфейс для описания данных абонента.
 */
export interface ISubscriberClient {
  /**
   * Идентификатор абонента.
   */
  id: number;

  /**
   * Номер телефона абонента.
   */
  msisdn: string;

  /**
   * Регион абонента.
   */
  region: IRegionType;

  /**
   * Статус абонента.
   */
  state: IStateClient;

  /**
   * Дополнительный городской номер.
   */
  additionalPhoneNumber: string;

  /**
   * Оборудование, используемое абонентом.
   */
  equipment: IEquipmentClient;
}
