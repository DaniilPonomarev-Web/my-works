import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SearchAreaEnum } from '@web-clients-backend/shared';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType({
  description:
    'DTO для представления области поиска с меткой. Содержит поле `area`, представляющее область поиска, и поле `label`, представляющее строку метки, сопутствующую данной области.',
})
export class SearchAreaWithLabelDTO {
  @Field(() => SearchAreaEnum, {
    description: 'Тип области поиска из списка возможных значений.',
  })
  area!: SearchAreaEnum;

  @Field(() => String, {
    description: 'Текстовое представление области поиска.',
  })
  label!: string;
}

@ObjectType({ description: 'Список областей поиска с метками' })
export class SearchAreasDTO {
  @Field(() => [SearchAreaWithLabelDTO], {
    description: 'Массив объектов с метками для каждого типа области поиска.',
  })
  areas!: SearchAreaWithLabelDTO[];
}

@InputType({ description: 'DTO для получения областей поиска' })
export class GetSearchAreasInputDTO {
  @Field(() => String, {
    description: 'Входное значение для определения областей поиска',
  })
  @IsNotEmpty({
    message: 'Поле не может быть пустым',
  })
  @IsString({
    message: 'Данные должны быть строкой',
  })
  input: string;

  constructor(input: string) {
    this.input = input;
  }
}
