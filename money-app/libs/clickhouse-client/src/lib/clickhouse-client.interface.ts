import { Observable } from 'rxjs';

export interface ClickHouseService {
  ExecuteQuery(data: IExecuteQueryOption): Observable<any>;
}

interface IExecuteQueryOption {
  database: string;
  output_format: string;
  query: string;
}

export interface Transaction {
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
}
