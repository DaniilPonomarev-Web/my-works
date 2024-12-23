import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IInformation } from '../interface/information.interface';
import { IsOptional } from 'class-validator';
@ObjectType({ description: 'DTO информационной странички' })
export class InformationDTO implements IInformation {
  @Field({ description: 'Идентификатор информационной странички' })
  id: string;

  @Field({ description: `Имя страницы` })
  name: string;

  @Field({ description: `Заголовок страницы` })
  title: string;

  @Field({ description: `Контент страницы` })
  content: string;

  @Field({ description: `Статус страницы` })
  status: boolean;

  constructor(
    id: string,
    name: string,
    title: string,
    content: string,
    status: boolean
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.content = content;
    this.status = status;
  }
}

@ObjectType({ description: 'DTO информационных странички' })
export class InformationDataDTO {
  @Field(() => [InformationDTO], { description: 'Информационные страницы' })
  data: InformationDTO[];

  @Field({ description: `количество` })
  total: number;
}

@InputType({ description: 'DTO для создания информационной странички' })
export class InputCreateInformationDTO {
  @IsOptional()
  @Field({ description: `Имя страницы` })
  name: string;

  @IsOptional()
  @Field({ description: `Заголовок страницы` })
  title: string;

  @IsOptional()
  @Field({ description: `Контент страницы` })
  content: string;

  @IsOptional()
  @Field({ description: `Статус страницы` })
  status: boolean;

  constructor(name: string, title: string, content: string, status: boolean) {
    this.name = name;
    this.title = title;
    this.content = content;
    this.status = status;
  }
}

@InputType({ description: 'DTO для создания информационной странички' })
export class InputUpdateInformationDTO {
  @IsOptional()
  @Field({ description: 'Идентификатор информационной странички' })
  id: string;

  @IsOptional()
  @Field({ description: `Имя страницы` })
  name: string;

  @IsOptional()
  @Field({ description: `Заголовок страницы` })
  title: string;

  @IsOptional()
  @Field({ description: `Контент страницы` })
  content: string;

  @IsOptional()
  @Field({ description: `Статус страницы` })
  status: boolean;

  constructor(
    id: string,
    name: string,
    title: string,
    content: string,
    status: boolean
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.content = content;
    this.status = status;
  }
}
