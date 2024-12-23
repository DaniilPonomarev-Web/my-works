import { IBaseEntity } from '../base/entity.interface';

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export interface ICategory extends IBaseEntity {
  /**
   * ID аккаунта
   */
  accountId: string;

  /**
   * ID группы
   */
  groupId: string;

  /**
   * Наименование
   */
  name: string;

  /**
   * тип доход или расход
   */
  type: TransactionType;

  /**
   * Статус
   */
  status: boolean;

  /**
   * limit
   */
  limit?: number | null;
}
