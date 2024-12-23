/**
 * ДАнные для создания приглашения полльзователя
 */
export interface CreatedInviteData {
  /**
   * ID аккаунта
   */
  accountId: string;

  /**
   * ID группы
   */
  groupId: string;

  /**
   * Телефон пользователя
   */
  phone: string;

  /**
   * Email для отправки приглашения
   */
  email: string;
}
