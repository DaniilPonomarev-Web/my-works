import { Args, registerEnumType } from '@nestjs/graphql';

/**
 * Перечисление `StateSubscriber` используется для описания различных состояний абонента.
 */
export enum StateSubscriber {
  /**
   * Абонент временно приостановлен.
   */
  suspended = 'Приостановлен',
  /**
   * Абонентский контракт закрыт.
   */
  closed = 'Закрыт',
  /**
   * Абонент активен.
   */
  active = 'Активен',
}

/**
 * Регистрация перечисления `StateSubscriber` в контексте GraphQL.
 *
 * @remarks
 * - Указывает имя `StateSubscriber` и описание.
 * - Описывает значения перечисления в GraphQL, добавляя описание каждому из них.
 */
registerEnumType(StateSubscriber, {
  name: 'StateSubscriber',
  description: 'Состояние абнента',
  valuesMap: {
    suspended: {
      description: 'Приостановлен',
    },
    closed: {
      description: 'Закрыт',
    },
    active: {
      description: 'Активен',
    },
  },
});

/**
 * Аргумент `StateSubscriberArgs` используется в GraphQL для фильтрации по статусу абонента.
 *
 * @remarks
 * - Определяет nullable аргумент типа `StateSubscriber`.
 * - Предоставляет описание для документации GraphQL схемы.
 */
export const StateSubscriberArgs = Args('state', {
  nullable: true,
  description: ' Сортировка по статусу абонента',
  type: () => StateSubscriber,
});
