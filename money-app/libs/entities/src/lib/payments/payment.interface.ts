import { IBaseEntity } from '../base/entity.interface';

export interface IPayment extends IBaseEntity {
  /**
   * ID аккаунта
   */
  accountId: string;

  /**
   * Сумма
   */
  amount: number;

  /**
   * Дaнные оплаты
   */
  transactionData: string;

  /*Продолжительность */
  duration: string;

  /*Описание платежа*/
  description: string;

  /*Статус платежа*/
  status: boolean;
}

export interface IPaymentData {
  /**
   * ID аккаунта
   */
  accountId: string;

  /**
   * Сумма
   */
  amount: number;

  /**
   * Дaнные оплаты
   */
  transactionData: string;

  /*Продолжительность */
  duration: string;

  /*Описание платежа*/
  description: string;

  /*Статус платежа*/
  status: boolean;
}
