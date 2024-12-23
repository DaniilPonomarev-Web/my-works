import { IsNumber, IsOptional } from 'class-validator';
import { Field, Float, InputType } from '@nestjs/graphql';

/**
 * `PaginationDTO` - это класс для описания параметров пагинации в GraphQL.
 * Содержит поля для номера страницы (`page`) и количества элементов на странице (`perPage`).
 * Используются декораторы `class-validator` для проверки чисел и `NestJS` для описания полей в GraphQL.
 *
 * - `page`: Номер страницы (по умолчанию 1).
 * - `perPage`: Количество элементов на странице (по умолчанию 10).
 */
@InputType({ description: 'Инпут для пагинации' })
export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  @Field(() => Float, {
    nullable: false,
    defaultValue: 1,
    description: 'Номер страницы',
  })
  page: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, {
    nullable: false,
    defaultValue: 10,
    description: 'Количество элементов на странице',
  })
  perPage: number;

  constructor(page: number, perPage: number) {
    this.page = page;
    this.perPage = perPage;
  }
}
