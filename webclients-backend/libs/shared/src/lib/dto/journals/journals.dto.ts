import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

/**
 * `JournalDTO` - это объектный тип для описания записи журнала.
 * Содержит поля для уникального идентификатора (`id`), сервиса (`service`), администратора (`admin`),
 * текста действия (`text`), даты действия (`registred`) и дополнительных данных (`additionalData`).
 *
 * - `id`: Уникальный идентификатор записи.
 * - `service`: Название сервиса, к которому относится действие.
 * - `admin`: Логин пользователя, который выполнял действие (необязательно).
 * - `text`: Описание действия.
 * - `registred`: Дата и время регистрации действия.
 * - `additionalData`: Дополнительные данные, связанные с действием (json объект или массив объектов).
 */
@ObjectType({ description: 'Лог' })
export class JournalDTO {
  @Field(() => ID, { description: 'Уникальный идентификатор действия' })
  id: string;

  @Field({ description: 'Сервис, в котором это сделано' })
  service: string;

  @Field({
    description: 'Логин пользователя который все это сделал',
    nullable: true,
  })
  admin: string;

  @Field({ description: 'Действие' })
  text: string;

  @Field({ description: 'Дата действия', nullable: true })
  registred: Date;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description:
      'Дополнительные данные, связанные с действием (json скорее всего)',
  })
  additionalData?: Record<string, any> | Array<Record<string, any>>;
}

/**
 * `JournalsDTO` - это объектный тип для представления списка журналов.
 * Содержит массив записей журнала и общее количество записей.
 *
 * - `journals`: Список записей журнала.
 * - `total`: Общее количество записей.
 */
@ObjectType({ description: 'Список действий' })
export class JournalsDTO {
  @Field(() => [JournalDTO], { description: 'Список Действий' })
  journals: JournalDTO[];

  @Field(() => Float, { description: 'Количество дейстивий' })
  total: number;

  constructor(journals: JournalDTO[], total: number) {
    this.journals = journals;
    this.total = total;
  }
}
