import { IBaseEntity } from '../base/entity.interface';

export interface IAccount extends IBaseEntity {
  /**
   * Настройки клиента
   */
  setting: string;

  /**
   * ID аккаунта
   */
  key: number;

  /**
   * Тип аккаунта
   */
  type: AccountType;

  /**
   * Дата регистрации
   */
  registred: Date;

  /**
   * Дата бловировки
   */
  blocked: Date;
}

export type AccountType = 'Person' | 'Business';
