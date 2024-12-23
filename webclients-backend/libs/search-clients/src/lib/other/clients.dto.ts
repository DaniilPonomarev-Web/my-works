import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import {
  ClientDataDTO,
  JuridicalTypeClientEnum,
  MarketSegmentEnum,
  PaginatedResponseType,
  SearchAreaEnum,
  StateClientEnum,
} from '@web-clients-backend/shared';

@InputType({ description: 'Поле для сортировки' })
export class SortInput {
  @Field(() => String, { description: 'Поле для сортировки' })
  @IsString()
  @IsIn(['fio', 'msisdn', 'passport.serialNumber', 'birthDate'])
  field: string;

  @Field(() => String, { description: 'Направление сортировки' })
  @IsString()
  @IsIn(['asc', 'desc']) // Только 'asc' или 'desc'
  direction: 'asc' | 'desc';

  constructor(field: string, direction: 'asc' | 'desc') {
    this.field = field;
    this.direction = direction;
  }
}

@InputType({ description: 'DTO для создания пользователя с имплементацией' })
export class ClientFilterInput {
  @IsOptional()
  @IsEnum(JuridicalTypeClientEnum, {
    message: 'Неверный тип для juridicalType',
  })
  @Field(() => JuridicalTypeClientEnum, {
    nullable: true,
    description:
      'Юридический вид клиента (например - "INDIVIDUAL (Физическое лицо) ", "ENTREPRENEUR(ИП)", "LEGAL_ENTITY(Юридическое лицо)")',
  })
  juridicalType?: JuridicalTypeClientEnum;

  @IsOptional()
  @IsEnum(StateClientEnum, { message: 'Неверный тип для contractState' })
  @Field(() => StateClientEnum, {
    nullable: true,
    description:
      'Статус договора (например, "ACTIVE", "SUSPENDED - Приостановлен", "BLOCKED - Блокирован", "CLOSED - Закрыт")',
  })
  contractState?: StateClientEnum;

  @IsOptional()
  @IsEnum(MarketSegmentEnum, {
    message: 'Неверный тип для рыночного сегмента',
  })
  @Field(() => MarketSegmentEnum, {
    nullable: true,
    description: 'Рыночный сегмент',
  })
  marketSegment?: MarketSegmentEnum;
}

@InputType()
export class ClientsSearchInputDTO {
  @Field(() => String, { description: 'Ввод для поиска клиентов' })
  @IsString()
  input!: string | number;

  @Field(() => SearchAreaEnum, {
    description: 'Область поиска (например, ACCOUNT_NUMBER)',
  })
  @IsEnum(SearchAreaEnum)
  area!: SearchAreaEnum;
}

@ObjectType({ description: 'Список найденных клиентов' })
export class ClientsSearchedDTO extends PaginatedResponseType(ClientDataDTO) {
  @Field(() => [ClientDataDTO], { description: 'Список клиентов' })
  override items: ClientDataDTO[];

  @Field(() => Float, { description: 'Количество клиентов' })
  override total: number;
}
