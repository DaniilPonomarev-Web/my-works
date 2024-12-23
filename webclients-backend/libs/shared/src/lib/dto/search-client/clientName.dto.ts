import { ObjectType, Field } from '@nestjs/graphql';
import { INameClientSearch } from '../../interfaces';
import { StructuredNameClientSearchDTO } from './structuredClientName.dto';

/**
 * `NameClientSearchDTO` - объектный тип для представления имени клиента в структурированном и неструктурированном виде.
 */
@ObjectType({
  description:
    'Объектный тип для представления имени клиента в структурированном и неструктурированном виде.',
})
export class NameClientSearchDTO implements INameClientSearch {
  @Field(() => StructuredNameClientSearchDTO, {
    description: 'Структурированное имя клиента',
  })
  structured: StructuredNameClientSearchDTO;

  @Field(() => String, { description: 'Неструктурированное имя клиента' })
  unstructured: string;

  constructor(structured: StructuredNameClientSearchDTO, unstructured: string) {
    this.structured = structured;
    this.unstructured = unstructured;
  }
}
