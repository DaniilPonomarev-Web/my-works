import { registerEnumType } from '@nestjs/graphql';

/**
 * Перечисление состояний клиента.
 * @enum {string}
 */
export enum StateClientEnum {
  ACTIVE = 'Активен',
  BLOCKED = 'Блокирован',
  CLOSED = 'Закрыт',
  SUSPENDED = 'Приостановлен',
  FROZEN = 'Заморожен',
  PREPARED = 'Подготовлен',
}

/**
 * Регистрация типа enum для состояния клиента.
 * @type {GraphQLEnumType}
 */
registerEnumType(StateClientEnum, {
  name: 'StateTypeEnum',
  description: 'Статусы абонента',
});

/**
 * Перечисление рыночных сегментов для клиентов.
 * @enum {string}
 */
export enum MarketSegmentEnum {
  MASSMARKET = 'Массовый рынок',
  DEALER = 'Дилер',
  VIP = 'VIP',
  TEST_CLIENT = 'TEST-клиент',
  EMPTY_CONTRACT = 'Пустой контракт',
  ROAMING_PARTNER = 'Роуминговый партнер',
  SERVICE = 'Служебный',
  CORPORATE_CREDIT = 'Корпоративный/Кредит',
  TEMPLATE_CLIENT = 'Клиент-шаблон для саморегистрации',
  BUSINESS_LINE = 'Линия Бизнеса',
  TILIDA = 'ТиЛиДа',
  GUIN = 'ГУИН',
  PAYMENT_ORGANIZATIONS = 'Организации принимающие платежи',
  NO_DISCONNECT = 'Не отключать',
  DO_NOT_DISABLE = 'DO_NOT_DISABLE',
}

/**
 * Регистрация типа enum для рыночного сегмента.
 * @type {GraphQLEnumType}
 */
registerEnumType(MarketSegmentEnum, {
  name: 'MarketSegmentEnum',
  description: 'Рыночный сегмент',
});

/**
 * Перечисление типов юридических лиц для клиентов.
 * @enum {string}
 */
export enum JuridicalTypeClientEnum {
  INDIVIDUAL = 'Физ. лицо',
  LEGAL_ENTITY = 'Юр. лицо',
  ENTREPRENEUR = 'ИП',
  PRIVATEEENTERPRISE = 'ЧП',
}

/**
 * Регистрация типа enum для юридического типа клиента.
 * @type {GraphQLEnumType}
 */
registerEnumType(JuridicalTypeClientEnum, {
  name: 'JuridicalTypeClientEnum',
  description: 'Статусы абонента',
});
