import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IOptionFilter } from '../../interfaces';

@ObjectType({ description: 'Опции для фильтра' })
export class OptionFilterDTO implements IOptionFilter {
  @Field(() => ID, { description: 'ID' })
  id: string;

  @Field({ description: 'Название опции (размер цвет и прочая)' })
  optionName: string;

  @Field(() => [String], { description: 'Актуальные значения' })
  values: string[];

  constructor(id: string, optionName: string, values: string[]) {
    this.id = id;
    this.optionName = optionName;
    this.values = values;
  }
}
