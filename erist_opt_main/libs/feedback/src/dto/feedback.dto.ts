import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { HttpExceptionMessagesGraphQL, UserDTO } from '@erist-opt/shared';
import { IFeedBack, IFeedBackId } from '../interface/feedback.interface';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType({ description: 'Представляет запрос пользователя' })
export class FeedBackDto implements IFeedBack {
  @Field(() => ID, { description: 'Уникальный идентификатор запроса' })
  id: string;

  @Field(() => UserDTO, { description: 'Пользователь, оставивший запрос' })
  user: UserDTO;

  @Field({ description: 'Текст запроса' })
  text: string;

  @Field({ description: 'Статус запроса (например, обработан или нет)' })
  status: boolean;
}

@ObjectType()
export class FeedBackListDTO {
  @Field(() => [FeedBackDto], { description: 'список запросов' })
  data: FeedBackDto[];

  @Field({
    nullable: false,
    description: 'Количество запросов',
  })
  total: number;

  constructor(data: FeedBackDto[], total: number) {
    this.data = data;
    this.total = total;
  }
}

@InputType({ description: 'Данные, необходимые для создания нового запрос' })
export class CreateFeedBackInput {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsFeedBack.text.not,
  })
  @Field({ description: 'Текст запроса' })
  text: string;
}

@InputType({
  description: 'Данные, необходимые для идентификации запроса по ID',
})
export class FeedBackIdInput implements IFeedBackId {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.validationsFeedBack.id.not,
  })
  @Field(() => ID, { description: 'Уникальный идентификатор запроса' })
  id: string;
}

@InputType({ description: 'Инпут для фильтров дерева категорий' })
export class FeedBackListFilterAdminDTO {
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
    description: 'фильтр по статусу',
  })
  filterStatus: boolean;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по inn пользователя ',
  })
  filterUserInn: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по части текста',
  })
  filterText: string;

  constructor(
    filterStatus: boolean,
    filterUserInn: string,
    filterText: string
  ) {
    this.filterStatus = filterStatus;
    this.filterUserInn = filterUserInn;
    this.filterText = filterText;
  }
}
