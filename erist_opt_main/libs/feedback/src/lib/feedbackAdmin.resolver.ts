import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeedbackService } from './feedback.service';
import { OrdersPaginationAdminDTO } from '@erist-opt/shared';
import {
  FeedBackDto,
  FeedBackIdInput,
  FeedBackListDTO,
  FeedBackListFilterAdminDTO,
} from '../dto/feedback.dto';

@Resolver(() => FeedBackDto)
export class AdminFeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Получение всех отзывов с фильтрацией и сортировкой
  @Query(() => FeedBackListDTO, {
    description: 'Получение всех отзывов с фильтрацией по статусу',
  })
  async getAllFeedbacks(
    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO,
    @Args('filter', { nullable: true }) filter?: FeedBackListFilterAdminDTO
  ): Promise<FeedBackListDTO> {
    let feedbacks = await this.feedbackService.getAllFeedbacks(
      filter?.filterStatus
    );

    if (filter?.filterText) {
      feedbacks = feedbacks.filter((fb) => fb.text.includes(filter.filterText));
    }

    if (filter?.filterUserInn) {
      feedbacks = feedbacks.filter((fb) =>
        fb.user.company.inn.includes(filter.filterUserInn.toString())
      );
    }

    // Сортировка
    const feedbackLenght = feedbacks.length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;
    return {
      data: feedbacks.slice(startIndex, endIndex),
      total: feedbackLenght,
    };
  }

  // Обновление статуса отзыва
  @Mutation(() => FeedBackDto, { description: 'Обновление статуса отзыва' })
  async updateFeedbackStatus(
    @Args('input') input: FeedBackIdInput
  ): Promise<FeedBackDto> {
    return await this.feedbackService.updateFeedbackStatus(input.id, true);
  }

  // Получение одного отзыва по ID
  @Query(() => FeedBackDto, { description: 'Получение одного отзыва по ID' })
  async getFeedbackById(
    @Args('input') input: FeedBackIdInput
  ): Promise<FeedBackDto> {
    return await this.feedbackService.getFeedbackById(input.id);
  }
}
