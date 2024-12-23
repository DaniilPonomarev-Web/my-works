import { SN } from '../../types';

/**
 * Интерфейс для дополнительных свойств клиента.
 */
export interface IOptionalPropertyClient {
  /**
   * Идентификатор дополнительного свойства.
   */
  id: number;

  /**
   * Название дополнительного свойства.
   */
  name: string;

  /**
   * Значение дополнительного свойства.
   */
  value: SN;
}
