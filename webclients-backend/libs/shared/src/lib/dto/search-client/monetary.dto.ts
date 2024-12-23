import { ObjectType, Field, Float } from '@nestjs/graphql';
import { IMonetaryClient } from '../../interfaces';

/**
 * `MonetaryClientSearchDTO` - объектный тип для представления денежных средств клиента.
 */
@ObjectType({
  description: 'Объектный тип для представления денежных средств клиента.',
})
export class MonetaryClientSearchDTO implements IMonetaryClient {
  @Field(() => String, {
    description: 'Наименование баланса (например, Основной или Коррекционный)',
  })
  name: string;

  @Field(() => Float, { description: 'Значение баланса' })
  value: number;
}
