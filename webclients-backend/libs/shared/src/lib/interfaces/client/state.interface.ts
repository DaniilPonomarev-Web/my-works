import { StateType } from '../../types';

/**
 * Интерфейс для описания состояния клиента.
 */
export interface IStateClient {
  /**
   * Идентификатор статуса клиента (stat_id из client_history).
   */
  id: number;

  /**
   * Название статуса клиента.
   */
  name: StateType;
}
