/**
 * Enom представляет возможный статус проверки паспорта.
 */
export enum PassportVerificationStatus {
  /**
   * Запрос на проверку паспорта = "не заполнено".
   */
  NOT_SENT = 'NOT_SENT',

  /**
   * Запрос на проверку паспорта = "да".
   */
  AWAITING_VERIFICATION = 'AWAITING_VERIFICATION',

  /**
   * Статус обработки = "создана заявка".
   */
  REQUEST_CREATED = 'REQUEST_CREATED',

  /**
   * Статус обработки = "не удалось отправить".
   */
  FAILED_TO_SEND = 'FAILED_TO_SEND',

  /**
   * Статус обработки = "Обработка СМЭВ".
   */
  UNDER_REVIEW = 'UNDER_REVIEW',

  /**
   * Результат проверки = "информация не найдена".
   */
  INFO_NOT_FOUND = 'INFO_NOT_FOUND',

  /**
   * Результат проверки = "Не действителен".
   */
  INVALID = 'INVALID',

  /**
   * Результат проверки = "Действителен".
   */
  VALID = 'VALID',
}
