// eslint-disable-next-line @nx/enforce-module-boundaries
import { TransactionType } from '@money-app/entities';

/**
 * Интерфейс для создания категории
 */
export interface ICategoryInput {
  /**
   * Идентификатор клиента
   */
  accountId: string;

  /**
   * Название категории
   */
  name: string;

  /**
   * ID группы, к которой привязана категория
   */
  groupId: string;

  /**
   * Доходы или расходы
   */
  type: TransactionType;

  /**
   * Статус категории (по умолчанию true)
   */
  status?: boolean;
}
