import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType({ description: 'Создание значения опции' })
export class CreateOptionValueInput {
  @IsOptional()
  @Field()
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  sortOrder: number;

  @IsOptional()
  @Field({ nullable: true })
  colorCode: string | null;

  constructor(name: string, sortOrder: number, colorCode: string) {
    this.name = name;
    this.sortOrder = sortOrder;
    this.colorCode = colorCode;
  }
}

@InputType({ description: 'Создание опции' })
export class CreateOptionInput {
  @IsOptional()
  @Field()
  name: string;

  @IsOptional()
  @Field()
  type: string;

  @IsOptional()
  @Field({ nullable: true })
  sortOrder: number;

  @IsOptional()
  @Field(() => [CreateOptionValueInput])
  values: CreateOptionValueInput[];

  constructor(
    name: string,
    type: string,
    sortOrder: number,
    values: CreateOptionValueInput[]
  ) {
    this.name = name;
    this.type = type;
    this.sortOrder = sortOrder;
    this.values = values;
  }
}

@InputType()
export class CreateOptionValueForOptionInput {
  @IsOptional()
  @Field(() => ID)
  optionId: string;

  @IsOptional()
  @Field(() => [CreateOptionValueInput])
  values: CreateOptionValueInput[];

  constructor(optionId: string, values: CreateOptionValueInput[]) {
    this.optionId = optionId;
    this.values = values;
  }
}

@InputType({ description: 'Обновление значения опции' })
export class UpdateOptionValueInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  id: string;

  @IsOptional()
  @Field()
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  sortOrder: number;

  @IsOptional()
  @Field({ nullable: true })
  colorCode: string | null;

  constructor(name: string, sortOrder: number, colorCode: string) {
    this.name = name;
    this.sortOrder = sortOrder;
    this.colorCode = colorCode;
  }
}
@InputType()
export class UpdateOptionValueForOptionInput {
  @IsOptional()
  @Field(() => ID)
  optionId: string;

  @IsOptional()
  @Field(() => [UpdateOptionValueInput])
  values: UpdateOptionValueInput[];

  constructor(optionId: string, values: UpdateOptionValueInput[]) {
    this.optionId = optionId;
    this.values = values;
  }
}
