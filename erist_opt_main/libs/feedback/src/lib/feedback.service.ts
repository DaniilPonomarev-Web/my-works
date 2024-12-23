import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedBack } from '../entity/feedback.entity';
import { ICreateFeedBack } from '../interface/feedback.interface';
import { User } from '@erist-opt/shared';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedBack)
    private readonly feedbackRepository: Repository<FeedBack>
  ) {}

  // Получение всех запросов с фильтрацией по статусу
  async getAllFeedbacks(filterStatus?: boolean): Promise<FeedBack[]> {
    const query = this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.user', 'user')
      .leftJoinAndSelect('user.company', 'company')
      .orderBy('feedback.registred', 'DESC');
    if (filterStatus !== null) {
      query.andWhere('feedback.status = :status', { status: filterStatus });
    }

    return query.getMany();
  }

  // Получение одного запроса по ID
  async getFeedbackById(id: string): Promise<FeedBack> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['user', 'user.company'],
    });
    if (!feedback) {
      throw new NotFoundException('Запрос по id не найден');
    }
    return feedback;
  }

  // Обновление статуса запроса
  async updateFeedbackStatus(id: string, status: boolean): Promise<FeedBack> {
    const feedback = await this.getFeedbackById(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    feedback.status = status;
    return await this.feedbackRepository.save(feedback);
  }

  // Получение всех запросов пользователя
  async getUserFeedbacks(userId: string): Promise<FeedBack[]> {
    return await this.feedbackRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'user.company'],
      order: { registred: 'DESC' },
    });
  }

  // Создание нового запроса
  async createFeedback(
    createFeedbackDto: ICreateFeedBack,
    user: User
  ): Promise<FeedBack> {
    const feedback = this.feedbackRepository.create({
      ...createFeedbackDto,
      user,
    });

    return await this.feedbackRepository.save(feedback);
  }
}
