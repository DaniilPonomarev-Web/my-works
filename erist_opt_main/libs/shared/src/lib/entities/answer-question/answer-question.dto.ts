import {ObjectType, Field, ID, InputType} from '@nestjs/graphql';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  IAnswerQuestion,
  IInputAnswerQuestion,
  IInputToggleAnswerQuestionStatus,
  IInputUpdateAnswerQuestion,
} from '@lk-ul-motiv/shared';

@ObjectType()
export class AnswerQuestionDTO implements IAnswerQuestion {
  @Field(() => ID)
  id: string;

  @Field({nullable: false, description: 'Вопрос'})
  question: string;

  @Field({nullable: true, description: 'Ответ'})
  answer: string;

  @Field({nullable: true, description: 'Статус включен выключен'})
  status: boolean;

  @Field({nullable: true, description: 'Порядок сортировки'})
  sort: number;

  constructor(id: string, question: string, answer: string, status: boolean, sort: number) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.status = status;
    this.sort = sort;
  }
}

@InputType()
export class InputAnswerQuestionDTO implements IInputAnswerQuestion {
  @Field({nullable: false, description: 'Вопрос'})
  question: string;

  @Field({nullable: false, description: 'Ответ'})
  answer: string;

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
  }
}

@InputType()
export class InputUpdateAnswerQuestionDTO implements IInputUpdateAnswerQuestion {
  @Field(() => ID)
  id: string;

  @Field({nullable: true, description: 'Вопрос'})
  question: string;

  @Field({nullable: true, description: 'Ответ'})
  answer: string;

  @Field({nullable: true, description: 'Статус включен выключен '})
  status: boolean;

  constructor(id: string, question: string, answer: string, status: boolean) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.status = status;
  }
}

@InputType()
export class InputToggleAnswerQuestionStatus implements IInputToggleAnswerQuestionStatus {
  @Field({nullable: false, description: 'ID вопрос-ответа'})
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
