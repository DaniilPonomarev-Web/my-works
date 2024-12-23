import { registerEnumType } from '@nestjs/graphql';

/**
 * Перечисление, представляющее статус номера MSISDN.
 * @enum {string}
 */
export enum MsisdnStatus {
  UNAVAILABLE = 'Не доступен',
  FREE = 'Свободен',
  LINKED = 'Связан',
  IN_USE = 'Используется',
  TRASH = 'Отстой',
  RESERVED = 'Зарезервирован',
  LINKING = 'Связывается',
  OCCUPIED = 'Номер занят',
  LINKING_TO_DEVICE = 'Связывается с аппаратом',
  RESERVED_FOR_SIM = 'Зарезервирован для заказа SIM',
}

/**
 * Перечисление, представляющее категорию номера MSISDN.
 * @enum {string}
 */
export enum MsisdnCategory {
  REGULAR = 'Обычный',
  VIP = 'VIP',
  GOLD_1 = 'Золото 1 кат',
  PRESTIGE = 'Престиж',
  RESERVE = 'Резерв',
  PLATINUM_1 = 'Платина 1 кат',
  GOLD_3 = 'Золото 3 кат',
  TECHNOLOGICAL = 'Технологический',
  PLATINUM_2 = 'Платина 2 кат',
  EXCLUSIVE = 'Эксклюзивный',
  SILVER = 'Серебряный',
  GOLD_2 = 'Золото 2 кат',
  GOLD_4 = 'Золото 4 кат',
  PLATINUM_3 = 'Платина 3 кат',
  PLATINUM_4 = 'Платина 4 кат',
  SILVER_GN = 'Серебряный(гн)',
  EXCLUSIVE_GN = 'Эксклюзивный(гн)',
  TECHNOLOGICAL_ASR = 'Технологический АСР',
  REGULAR_GN = 'Обычный(гн)',
  SILVER_1 = 'Серебряный 1 кат',
  SILVER_2 = 'Серебряный 2 кат',
  SELF_ACTIVATION = 'Для самоактивации',
}

/**
 * Перечисление, представляющее регион.
 * @enum {string}
 */
export enum Region {
  SVERDLOVSK = 'Свердловская область',
  ALL_RUSSIA = 'Вся Россия',
  KURGAN = 'Курганская область',
  YANAO = 'ЯНАО',
  TYUMEN = 'Тюменская область',
}

/**
 * Регистрация перечисления статуса MSISDN для GraphQL.
 * @type {GraphQLEnumType}
 */
registerEnumType(MsisdnStatus, {
  name: 'MsisdnStatus',
  description: 'Статус номера',
});

/**
 * Регистрация перечисления категории MSISDN для GraphQL.
 * @type {GraphQLEnumType}
 */
registerEnumType(MsisdnCategory, {
  name: 'MsisdnCategory',
  description: 'Категория номера',
});

/**
 * Регистрация перечисления региона для GraphQL.
 * @type {GraphQLEnumType}
 */
registerEnumType(Region, {
  name: 'Region',
  description: 'Регион',
});
