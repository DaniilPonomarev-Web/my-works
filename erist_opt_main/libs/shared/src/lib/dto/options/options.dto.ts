import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IOption, IOptionValue } from '../../interfaces';
import { ProductOptionValueDTO } from '../product';

@ObjectType({ description: 'Опция' })
export class OptionDTO implements IOption {
  @Field(() => ID, { description: 'ID опции' })
  id: string;

  @Field({ description: 'Название опции' })
  name: string;

  @Field({ description: 'Тип опции' })
  type: string;

  @Field({ description: 'Порядок сортировки' })
  sortOrder: number;

  @Field(() => [OptionValueDTO], { description: 'Значения опции' })
  values: OptionValueDTO[];

  constructor(
    id: string,
    name: string,
    type: string,
    sortOrder: number,
    values: OptionValueDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.sortOrder = sortOrder;
    this.values = values;
  }
}

@ObjectType({ description: 'Список опций' })
export class OptionsListDTO {
  @Field(() => [OptionDTO], { description: 'Список опций' })
  options: OptionDTO[];

  @Field(() => Float, { description: 'Количество опций' })
  total: number;

  constructor(options: OptionDTO[], total: number) {
    this.options = options;
    this.total = total;
  }
}

@ObjectType({ description: 'Значение опции' })
export class OptionValueDTO implements IOptionValue {
  @Field(() => ID, { description: 'ID значения опции' })
  id: string;

  @Field({ description: 'Название значения опции' })
  name: string;

  @Field({ description: 'Порядок сортировки' })
  sortOrder: number;

  @Field({ description: 'COD TSVETA', nullable: true })
  colorCode: string | null;

  @Field(() => OptionDTO)
  option: OptionDTO;

  @Field(() => [ProductOptionValueDTO])
  productOptionValues: ProductOptionValueDTO[];
  constructor(
    id: string,
    name: string,
    sortOrder: number,
    option: OptionDTO,
    productOptionValues: ProductOptionValueDTO[],
    colorCode: string
  ) {
    this.id = id;
    this.name = name;
    this.sortOrder = sortOrder;
    this.option = option;
    this.productOptionValues = productOptionValues;
    this.colorCode = colorCode;
  }
}
