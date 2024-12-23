import { IJuridicalType, IRegionType, IClientType } from '../dictionary';
import { IBalanceClient } from './balance.interface';
import { IContractClient } from './contract.interface';
import { IDocumentClient } from './document.interface';
import { IEquipmentClient } from './equipment.interface';
import { INameClient } from './name.interface';
import { IOptionalPropertyClient } from './optionalProperty.interface';
import { IPaymentTypeClient } from './paymentType.interface';
import { IRelationClient } from './relation.interface';
import { IStateClient } from './state.interface';
import { ISubscriberClient } from './subscriber.interface';

/**
 * Интерфейс для данных результата API клиента.
 */
export interface IClientApiResult {
  /**
   * ID клиента.
   */
  id: number;

  /**
   * ID клиента.
   */
  customerId: number;

  /**
   * Номер счета.
   */
  account: number;

  /**
   * Баланс клиента.
   */
  balance: IBalanceClient;

  /**
   * Юридический тип клиента.
   */
  juridicalType: IJuridicalType;

  /**
   * Регион клиента.
   */
  region: IRegionType;

  /**
   * Имя клиента.
   */
  clientName: INameClient;

  /**
   * Договор клиента.
   */
  contract: IContractClient;

  /**
   * Массив документов клиента.
   */
  documents: IDocumentClient[];

  /**
   * Тип оплаты клиента.
   */
  paymentType: IPaymentTypeClient;

  /**
   * Тип клиента.
   */
  clientType: IClientType;

  /**
   * Состояние клиента.
   */
  state: IStateClient;

  /**
   * Оборудование клиента.
   */
  equipment: IEquipmentClient;

  /**
   * Массив абонентов клиента.
   */
  subscribers: ISubscriberClient[];

  /**
   * Дополнительные свойства клиента.
   */
  optionalProperties: IOptionalPropertyClient[];

  /**
   * Почтовый адрес клиента.
   */
  email: string;

  /**
   * Отношения клиента ?? Дети родители все дела.
   */
  relation: IRelationClient;
}
