import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ISearchUnlinkedMsisdnsResponse } from '../../interfaces';
import { SN } from '../../types';
import { PaginatedResponseType } from '../helpersGql';

/**
 * `StateDto` - объектный тип для представления состояния объекта.
 */
@ObjectType({
  description: 'Объектный тип для представления состояния объекта.',
})
export class StateDto {
  @Field(() => Int, { description: 'Идентификатор состояния' })
  id: number;

  @Field(() => String, { description: 'Название состояния' })
  name: string;

  @Field(() => String, { description: 'Время изменения состояния' })
  changedAt: string;

  constructor(id: number, name: string, changedAt: string) {
    this.id = id;
    this.name = name;
    this.changedAt = changedAt;
  }
}

/**
 * `CategoryDto` - объектный тип для представления категории.
 */
@ObjectType({ description: 'Объектный тип для представления категории.' })
export class CategoryDto {
  @Field(() => Int, { description: 'Идентификатор категории' })
  id: number;

  @Field(() => String, { description: 'Название категории' })
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

/**
 * `RegionDto` - объектный тип для представления региона.
 */
@ObjectType({ description: 'Объектный тип для представления региона.' })
export class RegionDto {
  @Field(() => Int, { description: 'Идентификатор региона' })
  id: number;

  @Field(() => String, { description: 'Название региона' })
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

/**
 * `MsisdnDto` - объектный тип для представления номера телефона (MSISDN).
 */
@ObjectType({
  description: 'Объектный тип для представления номера телефона (MSISDN).',
})
export class MsisdnDto {
  @Field(() => Int, { description: 'Идентификатор номера телефона' })
  id: number;

  @Field(() => Number, { description: 'Сам номер телефона (MSISDN)' })
  msisdn: number;

  @Field(() => String, {
    description: 'Комментарий, связанный с номером',
    nullable: true,
  })
  comment?: string;

  @Field(() => StateDto, { description: 'Состояние номера телефона' })
  state: StateDto;

  @Field(() => CategoryDto, { description: 'Категория номера телефона' })
  category: CategoryDto;

  @Field(() => RegionDto, { description: 'Регион номера телефона' })
  region: RegionDto;

  constructor(
    id: number,
    msisdn: number,
    comment: string,
    state: StateDto,
    category: CategoryDto,
    region: RegionDto
  ) {
    this.id = id;
    this.msisdn = msisdn;
    this.comment = comment;
    this.state = state;
    this.category = category;
    this.region = region;
  }
}

/**
 * `SearchUnlinkedMsisdnsResponseDto` - объектный тип для представления результата поиска свободного номера телефона (MSISDN).
 */
@ObjectType({
  description:
    'Объектный тип для представления результата поиска несвязанного номера телефона (MSISDN).',
})
export class SearchUnlinkedMsisdnsResponseDto
  implements ISearchUnlinkedMsisdnsResponse
{
  @Field(() => [MsisdnDto], {
    nullable: true,
    description: 'Список несвязанных номеров телефонов (MSISDN)',
  })
  msisdns: (MsisdnDto | null)[];

  constructor(msisdns: (MsisdnDto | null)[]) {
    this.msisdns = msisdns;
  }
}
/**
 * `UnlinkedMsisdnsDto` - DTO для представления информации о несвязанных номерах телефонов (MSISDN).
 */
@ObjectType({
  description:
    'DTO для представления информации о несвязанных номерах телефонов (MSISDN).',
})
export class UnlinkedMsisdnsDto {
  @Field(() => String, { description: 'Текущий статус', nullable: true })
  status: SN;

  @Field(() => String, {
    description: 'Дата установки статуса',
    nullable: true,
  })
  dateStatus: SN;

  @Field(() => String, { description: 'MISDN пользователя', nullable: true })
  msisdn: SN;

  @Field(() => String, { description: 'Регион пользователя', nullable: true })
  region: SN;

  @Field(() => String, {
    description: 'Категория пользователя',
    nullable: true,
  })
  categoryName: SN;

  @Field(() => String, { description: 'Комментарий', nullable: true })
  comment: SN;

  constructor(
    status: SN,
    dateStatus: SN,
    msisdn: SN,
    region: SN,
    categoryName: SN,
    comment: SN
  ) {
    this.status = status;
    this.dateStatus = dateStatus;
    this.msisdn = msisdn;
    this.region = region;
    this.categoryName = categoryName;
    this.comment = comment;
  }
}

/**
 * `SearchUnlinkedMsisdnsDTO` - DTO для представления списка найденных несвязанных номеров (MSISDN) с тотал общим кол-вом для пагинации.
 */
@ObjectType({ description: 'Список найденных номеров' })
export class SearchUnlinkedMsisdnsDTO extends PaginatedResponseType(
  UnlinkedMsisdnsDto
) {
  @Field(() => [UnlinkedMsisdnsDto], { description: 'Список номеров' })
  override items: UnlinkedMsisdnsDto[];

  @Field(() => Float, { description: 'Количество свободных номеров' })
  override total: number;
}
