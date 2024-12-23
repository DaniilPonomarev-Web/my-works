import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Length, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import {
  ICreateUpdateSocialHref,
  ISocialHref,
  IUpdateSocialHref,
} from '@erist-opt/shared';

@InputType({
  description: 'DTO для создания или обновления ссылки на соц сеть',
})
export class CreateUpdateSocialHrefInputDTO implements ICreateUpdateSocialHref {
  @Length(1, 16, {
    message: 'тэг должен содержать от 1 до 16 символов',
  })
  @Field({ description: 'Название баннера', nullable: false })
  name: string;

  @Length(1, 50, {
    message: 'Ссылка должна содержать от 1 до 50 символов',
  })
  @Field({ description: 'Заголовок на баннере', nullable: true })
  href: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Укажите порядок сортировки',
  })
  @Field({ description: 'Порядок сортировки', nullable: true })
  sortOrder: number;

  constructor(name: string, href: string, sortOrder: number) {
    this.name = name;
    this.href = href;
    this.sortOrder = sortOrder;
  }
}

@ObjectType({ description: 'DTO социальной сети' })
export class SocialHrefDTO implements ISocialHref {
  @Field(() => ID, { description: 'UUID ссылки соц' })
  id: string;

  @Field({
    description: 'По большей части тэг, типа vk, inst, telegram, wa и тд',
    nullable: false,
  })
  name: string;

  @Field({ description: 'Ссылка на соц сеть', nullable: false })
  href: string;

  @Field({ description: 'Порядок сортировки', nullable: false })
  sortOrder: number;

  constructor(id: string, name: string, href: string, sortOrder: number) {
    this.id = id;
    this.name = name;
    this.href = href;
    this.sortOrder = sortOrder;
  }
}

@ObjectType({ description: 'DTO социальных сетей сети' })
export class SocialHrefsDataDTO {
  @Field(() => [SocialHrefDTO], { description: 'Соц сетей', nullable: false })
  data: SocialHrefDTO[];

  @Field({
    description: 'Количество',
    nullable: false,
  })
  total: number;

  constructor(data: SocialHrefDTO[], total: number) {
    this.data = data;
    this.total = total;
  }
}

@InputType({
  description: 'DTO для обновления ссылки на соц сеть',
})
export class UpdateSocialHrefInputDTO implements IUpdateSocialHref {
  @Field(() => ID, { description: 'UUID ссылки на соц сеть', nullable: false })
  @IsUUID()
  id: string;

  @Length(1, 16, {
    message: 'тэг должен содержать от 1 до 16 символов',
  })
  @Field({ description: 'Название баннера', nullable: false })
  name: string;

  @Length(1, 50, {
    message: 'Ссылка должна содержать от 1 до 50 символов',
  })
  @Field({ description: 'Заголовок на баннере', nullable: true })
  href: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Укажите порядок сортировки',
  })
  @Field({ description: 'Порядок сортировки', nullable: true })
  sortOrder: number;

  constructor(id: string, name: string, href: string, sortOrder: number) {
    this.id = id;
    this.name = name;
    this.href = href;
    this.sortOrder = sortOrder;
  }
}
