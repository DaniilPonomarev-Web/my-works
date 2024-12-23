import {
  IsOptional,
  IsString,
  IsArray,
  IsInt,
  MinLength,
  Matches,
  ArrayNotEmpty,
  MaxLength,
  IsIn,
  IsEnum,
} from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import {
  MsisdnCategory,
  MsisdnStatus,
  Region,
  SearchUnlinkedMsisdnsInput,
} from '@web-clients-backend/shared';

@InputType({ description: 'ДТО для поиска свободных номеров' })
export class SearchUnlinkedMsisdnsQueryDto
  implements SearchUnlinkedMsisdnsInput
{
  @Field(() => String, { description: 'Часть номера телефона' })
  @IsString()
  @MaxLength(10, { message: 'MSISDN должен содержать не более 10 символов.' })
  @MinLength(5, { message: 'MSISDN должен содержать не менее 5 символов.' })
  @Matches(/^[0-9%]+$/, {
    message: 'MSISDN может содержать только цифры и символ %.',
  })
  msisdn: string;

  @Field(() => [Int], {
    nullable: true,
    description: 'regionId брать из метода TODO',
  }) //TODO узнать метод для получения regionId
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({
    message: 'Массив regionId не должен быть пустым при предоставлении.',
  })
  @IsInt({ each: true, message: 'Каждый regionId должен быть целым числом.' })
  regionId?: number[];

  @Field(() => [Int], {
    nullable: true,
    description: 'categoryId брать из метода TODO',
  }) //TODO узнать метод для получения categoryId
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({
    message: 'Массив categoryId не должен быть пустым при предоставлении.',
  })
  @IsInt({ each: true, message: 'Каждый categoryId должен быть целым числом.' })
  categoryId?: number[];

  constructor(msisdn: string) {
    this.msisdn = msisdn;
  }
}

@InputType({ description: 'Входные данные для сортировки полученных данных' })
export class SortInputDTO {
  @Field(() => String, { description: 'Поле для сортировки' })
  @IsOptional()
  @IsString()
  @IsIn(['status', 'dateStatus', 'msisdn', 'region', 'categoryName', 'comment'])
  field: string;

  @Field(() => String, { description: 'Направление сортировки' })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc']) // Только 'asc' или 'desc'
  direction: 'asc' | 'desc';

  constructor(field: string, direction: 'asc' | 'desc') {
    this.field = field;
    this.direction = direction;
  }
}

@InputType({ description: 'Входные данные для фильтра полученных данных' })
export class MsisdnFilterDTO {
  @Field(() => MsisdnStatus, { nullable: true, description: 'Статус номера' })
  @IsOptional()
  @IsEnum(MsisdnStatus, {
    message: 'Статус должен быть одним из допустимых значений',
  })
  status?: MsisdnStatus;

  @Field(() => MsisdnCategory, {
    nullable: true,
    description: 'Категория номера',
  })
  @IsOptional()
  @IsEnum(MsisdnCategory, {
    message: 'Категория должна быть одним из допустимых значений',
  })
  category?: MsisdnCategory;

  @Field(() => Region, { nullable: true, description: 'Регион номера' })
  @IsOptional()
  @IsEnum(Region, {
    message: 'Регион должен быть одним из допустимых значений',
  })
  region?: Region;
}
