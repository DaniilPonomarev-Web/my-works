import { Field, ObjectType, ID } from '@nestjs/graphql';
import { OptionDTO, OptionValueDTO } from '../options';
import { IProductOption, IProductOptionValue } from '../../interfaces';

@ObjectType({ description: 'Опция продукта' })
export class ProductOptionDTO implements IProductOption {
  @Field(() => ID, { description: 'ID опции' })
  id: string;

  @Field({ description: 'Название опции' })
  name: string;

  @Field({ description: 'Тип опции' })
  type: string;

  @Field(() => [ProductOptionValueDTO], { description: 'Значения опции' })
  values: ProductOptionValueDTO[];

  constructor(
    id: string,
    name: string,
    type: string,
    values: ProductOptionValueDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.values = values;
  }
}

@ObjectType({ description: 'Значение опции продукта' })
export class ProductOptionValueDTO implements IProductOptionValue {
  @Field(() => ID, { description: 'ID значения опции' })
  id: string;

  @Field({ description: 'Цена' })
  price: number;

  @Field({ description: 'Количество товара с этой опцией' })
  quantity: number;

  @Field({
    description: 'Либо ID товара либо ссылка на него сразу',
    nullable: true,
  })
  href: string;

  @Field(() => OptionDTO, { nullable: true })
  option: OptionDTO;

  @Field(() => OptionValueDTO, { nullable: true })
  value: OptionValueDTO;

  constructor(
    id: string,
    price: number,
    quantity: number,
    href: string,
    option: OptionDTO,
    value: OptionValueDTO
  ) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.option = option;
    this.href = href;
    this.value = value;
  }
}

@ObjectType({ description: 'Опция продукта для пользователя' })
export class ProductOptionForUserDTO implements IProductOption {
  @Field(() => ID, { description: 'ID опции' })
  id: string;

  @Field({ description: 'Название опции' })
  name: string;

  @Field({ description: 'Тип опции' })
  type: string;

  @Field(() => [ProductOptionValueForUserDTO], {
    description: 'Значения опции',
  })
  values: ProductOptionValueForUserDTO[];

  constructor(
    id: string,
    name: string,
    type: string,
    values: ProductOptionValueForUserDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.values = values;
  }
}

@ObjectType({ description: 'Значение опции продукта для пользователя' })
export class ProductOptionValueForUserDTO implements IProductOptionValue {
  @Field(() => ID, { description: 'ID значения опции' })
  id: string;

  @Field({ description: 'Цена' })
  price: number;

  @Field({ description: 'Количество товара с этой опцией' })
  quantity: number;

  @Field({
    description: 'Либо ID товара либо ссылка на него сразу',
    nullable: true,
  })
  href: string;

  @Field(() => OptionDTO, { nullable: true })
  option: OptionDTO;

  @Field(() => OptionValueDTO, { nullable: true })
  value: OptionValueDTO;

  constructor(
    id: string,
    price: number,
    quantity: number,
    href: string,
    option: OptionDTO,
    value: OptionValueDTO
  ) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.href = href;
    this.option = option;
    this.value = value;
  }
}
