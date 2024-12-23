import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeedbackService } from './feedback.service';
import { CreateFeedBackInput, FeedBackDto } from '../dto/feedback.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';
import { User } from '@erist-opt/shared';
import { ICreateFeedBack } from '../interface/feedback.interface';

@Resolver(() => FeedBackDto)
// @UseGuards(JwtAuthGuard)
export class UserFeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Получение всех отзывов пользователя
  @Query(() => [FeedBackDto], {
    description: 'Получение всех отзывов пользователя',
  })
  async getUserFeedbacks(@Context() context: any): Promise<FeedBackDto[]> {
    const userContext = context.req.user;

    const feedbacks = await this.feedbackService.getUserFeedbacks(
      userContext.id
    );
    return feedbacks;
  }

  // Создание нового отзыва
  @Mutation(() => FeedBackDto, { description: 'Создание нового отзыва' })
  async createFeedback(
    @Args('createFeedbackInput') createFeedbackInput: CreateFeedBackInput,
    @Context() context: any
  ): Promise<FeedBackDto> {
    const user: User = context.req.user;
    const createData: ICreateFeedBack = {
      userId: user.id,
      text: createFeedbackInput.text,
    };
    return await this.feedbackService.createFeedback(createData, user);
  }
}
