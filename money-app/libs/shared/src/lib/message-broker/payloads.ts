type OperationType = 'expense' | 'income';

export interface TransactionPayload {
  /**
   * ID аккаунта
   */
  AccountID: string;

  /**
   * ID пользователя
   */
  UserID: string;

  /**
   * Имя пользователя
   */
  FirstName: string;

  /**
   * ID пользователя телеграмма
   */
  ChatID: number;

  /**
   * ID группы
   */
  GroupID: string;

  /**
   * Наименование группы
   */
  GroupName: string;

  /**
   * ID валюты
   */
  CurrencyID: string;

  /**
   * Наименование валюты
   */
  CurrencyName: string;

  /**
   * ID категории
   */
  CategoryID: string;

  /**
   * Наименование категории
   */
  CategoryName: string;

  /**
   * Сумма транзакции
   */
  Value: number;

  /**
   * Дата зачисления
   */
  EventDate: Date;

  /**
   * Тип операции
   */
  Operation: OperationType;
}

export interface IBodyForTransictionsByDate {
  dateFrom: string;
  dateTo: string;
  typeTransaction: string;
  chatId: number;
}
