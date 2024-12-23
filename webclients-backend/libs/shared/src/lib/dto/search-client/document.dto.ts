import { Field, ObjectType } from '@nestjs/graphql';
import { IDocumentClientSearch } from '../../interfaces';

/**
 * `DocumentClientSearchDTO` - объектный тип для представления данных документа клиента.
 */
@ObjectType({
  description: 'Объектный тип для представления данных документа клиента.',
})
export class DocumentClientSearchDTO implements IDocumentClientSearch {
  @Field(() => String, {
    description: 'Тип документа клиента (например, Паспорт РФ)',
  })
  type: string;

  @Field(() => String, { description: 'Серия документа клиента' })
  series: string;

  @Field(() => String, { description: 'Номер документа клиента' })
  number: string;

  @Field(() => String, { description: 'Дата выдачи документа' })
  issueDate: string;

  constructor(type: string, series: string, number: string, issueDate: string) {
    this.type = type;
    this.series = series;
    this.number = number;
    this.issueDate = issueDate;
  }
}
