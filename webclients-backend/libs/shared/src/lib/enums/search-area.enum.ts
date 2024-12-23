import { registerEnumType } from '@nestjs/graphql';

/**
 * Перечисление, представляющее области поиска для пользователя.
 * @enum {string}
 */
export enum SearchAreaEnum {
  FIO = 'FIO', // ФИО
  TITLE = 'TITLE', // Название
  PROCESSES = 'PROCESSES', // Процессы
  SERVICES = 'SERVICES', // Услуги
  TARIFFS = 'TARIFFS', // Тарифы

  SUBSCRIBER_NUMBER = 'SUBSCRIBER_NUMBER', // Абонентский номер
  MSISDN = 'MSISDN', // Номер телефона (свободный номер)
  PASSPORT = 'PASSPORT', // Паспорт
  ACCOUNT_NUMBER = 'ACCOUNT_NUMBER', // Номер лицевого счета
  CONTRACT_NUMBER = 'CONTRACT_NUMBER', // Номер договора
  DGN = 'DGN', // ДГН
  ICC = 'ICC', // Номер sim-карты ICC
}
/**
 * Области поиска меток для пользователя.
 */
export const searchAreaLabels = {
  /* Ввод текста*/
  [SearchAreaEnum.FIO]: 'ФИО',
  [SearchAreaEnum.TITLE]: 'Название',
  [SearchAreaEnum.PROCESSES]: 'Процессы', //таблица на бэке
  [SearchAreaEnum.SERVICES]: 'Услуги', //таблица на бэке
  [SearchAreaEnum.TARIFFS]: 'Тарифы', //таблица на бэке

  /* Ввод цифр*/
  [SearchAreaEnum.SUBSCRIBER_NUMBER]: 'Абонентский номер',
  [SearchAreaEnum.MSISDN]: 'Номер телефона (свободный номер)',
  [SearchAreaEnum.PASSPORT]: 'Паспорт',
  [SearchAreaEnum.ACCOUNT_NUMBER]: 'Номер лицевого счета',
  [SearchAreaEnum.CONTRACT_NUMBER]: 'Номер договора',
  [SearchAreaEnum.DGN]: 'ДГН',
  [SearchAreaEnum.ICC]: 'Номер sim-карты ICC',
};

/**
 * Регистрация перечисления областей поиска для GraphQL.
 * @type {GraphQLEnumType}
 */
registerEnumType(SearchAreaEnum, {
  name: 'SearchAreaEnum',
  description: 'Области поиска для пользователя',
});
