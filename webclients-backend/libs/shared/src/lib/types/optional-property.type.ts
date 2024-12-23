import { Args, registerEnumType } from '@nestjs/graphql';

/**
 * Перечисление `OptionalPropertyName` описывает доступные опциональные параметры для вывода поля.
 */
export enum OptionalPropertyName {
  /**
   * Машина-машина (M2M) связь.
   */
  M2M = 'M2M',
  /**
   * Полное имя (Ф.И.О).
   */
  FIO = 'Ф.И.О',
  /**
   * Организация, относящаяся к государственному бюджету.
   */
  budgetOrganization = 'Бюджетная организация',
  /**
   * Указывает на необходимость сверки данных через ГосУслуги.
   */
  notActivatedEsia = 'Требуется сверка данных на ГосУслугах, обратитесь к менеджеру.',
}

/**
 * Регистрация перечисления `OptionalPropertyName` в GraphQL.
 *
 * @remarks
 * - Позволяет использовать значения `OptionalPropertyName` в GraphQL-схеме.
 * - Описывает каждое значение перечисления для документации.
 */
registerEnumType(OptionalPropertyName, {
  name: 'OptionalPropertyName',
  description: 'Опциональные параметры для вывода поля',
  valuesMap: {
    M2M: {
      description: 'M2M',
    },
    FIO: {
      description: 'Ф.И.О',
    },
    budgetOrganization: {
      description: 'Бюджетная организация',
    },
    notActivatedEsia: {
      description:
        'Требуется сверка данных на ГосУслугах, обратитесь к менеджеру.',
    },
  },
});

/**
 * Тип `UserType` описывает возможные значения типа пользователя.
 *
 * @remarks
 * - Может быть одним из предопределенных значений (`M2M`, `Ф.И.О`, `Бюджетная организация`) или произвольной строкой.
 */
export type UserType = 'M2M' | 'Ф.И.О' | 'Бюджетная организация' | string;

/**
 * Аргумент `UserTypeArg` используется в GraphQL для фильтрации по типу пользователя.
 *
 * @remarks
 * - Определяет nullable аргумент типа `OptionalPropertyName`.
 * - Предоставляет описание для GraphQL-документации.
 */
export const UserTypeArg = Args('userType', {
  nullable: true,
  description: 'Сортировка по типу пользователя',
  type: () => OptionalPropertyName,
});
