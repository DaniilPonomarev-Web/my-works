import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from './class-type';

/**
 * `PaginatedResponseType<T>` создает абстрактный класс, предназначенный для представления пагинированных данных в GraphQL.
 * `classRef` - тип класса, который является частью пагинированного ответа (например, `ClientDataDTO`).
 * Абстрактный класс `PaginatedResponseTypeClass` содержит массив объектов типа `T` (данные) и целое число (`total`),
 * указывающее общее количество записей. Это полезно для отображения больших данных с поддержкой пагинации.
 */
export function PaginatedResponseType<T>(classRef: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseTypeClass {
    @Field(() => [classRef], { description: 'Список данных' })
    items: T[];

    @Field(() => Int, { description: 'Общее количество записей' })
    total: number;
  }

  return PaginatedResponseTypeClass;
}
