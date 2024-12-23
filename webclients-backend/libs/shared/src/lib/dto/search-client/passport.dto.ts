import { ObjectType, Field } from '@nestjs/graphql';
import { SN } from '../../types';

/**
 * `PassportClientSearchDTO` - объектный тип для представления данных паспорта клиента.
 */
@ObjectType({
  description: 'Объектный тип для представления данных паспорта клиента.',
})
export class PassportClientSearchDTO {
  @Field(() => String, {
    nullable: true,
    description: 'Серия и номер паспорта клиента',
  })
  serialNumber: SN;

  @Field(() => String, {
    nullable: true,
    description: 'Дата выдачи паспорта в формате YYYY-MM-DD',
  })
  date: SN;

  constructor(serialNumber: string, date: string) {
    this.serialNumber = serialNumber;
    this.date = date;
  }
}
