import { ObjectType, Field } from '@nestjs/graphql';
import { MonetaryClientSearchDTO } from './monetary.dto';
import { IBalanceClient } from '../../interfaces';

/**
 * `BalanceClientSearchDTO` - это объектный тип для представления балансов клиента.
 * Содержит список денежных балансов (`monetary`).
 */
@ObjectType({
  description: 'Объектный тип для представления балансов клиента.',
})
export class BalanceClientSearchDTO implements IBalanceClient {
  @Field(() => [MonetaryClientSearchDTO], {
    description: 'Список денежных балансов клиента.',
  })
  monetary: MonetaryClientSearchDTO[];

  constructor(monetary: MonetaryClientSearchDTO[]) {
    this.monetary = monetary;
  }
}
