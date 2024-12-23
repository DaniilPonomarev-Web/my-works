export interface IUser {
  /**
   * ID Акакунта
   */
  accountId: string;

  /**
   * ID группы
   */
  groupId: string;

  /**
   * ID пользователя телеграм
   */
  chatId: number;

  /**
   * Имя пользователя
   */
  firstName: string;

  /**
   * Фамилия
   */
  lastName: string;

  /**
   * Телефон
   */
  phone: string;

  /**
   * Статус
   */
  status: boolean;

  /**
   * Роль пользователя
   */
  role: UserRole;
}

/**
 * Роль пользователя
 */
export type UserRole = 'admin' | 'user';
