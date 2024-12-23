import { ObjectType, Field } from '@nestjs/graphql';
import { IStructuredClientName } from '../../interfaces';

/**
 * `StructuredNameClientSearchDTO` - объектный тип для представления структурированного имени клиента.
 */
@ObjectType({
  description:
    'Объектный тип для представления структурированного имени клиента.',
})
export class StructuredNameClientSearchDTO implements IStructuredClientName {
  @Field(() => String, { description: 'Имя клиента' })
  firstName: string;

  @Field(() => String, { description: 'Отчество клиента' })
  middleName: string;

  @Field(() => String, { description: 'Фамилия клиента' })
  lastName: string;

  constructor(firstName: string, middle: string, lastName: string) {
    this.firstName = firstName;
    this.middleName = middle;
    this.lastName = lastName;
  }
}
