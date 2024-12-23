import { EA } from '../../types';
import { IMonetaryClient } from './monetary.interface';

/**
 * Интерфейс для данных баланса клиента.
 */
export interface IBalanceClient {
  /**
   * Массив монетарных балансов клиента.
   */
  monetary: (IMonetaryClient | null)[] | EA;
}
