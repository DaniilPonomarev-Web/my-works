import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedBack } from '../entity/feedback.entity';
import { LogsModule } from '@erist-opt/logs';
import { KafkaModule } from '@erist-opt/kafka';
import { FeedbackService } from './feedback.service';
import { AdminFeedbackResolver } from './feedbackAdmin.resolver';
import { UserFeedbackResolver } from './feedbackUser.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBack]), LogsModule, KafkaModule],
  providers: [FeedbackService, AdminFeedbackResolver, UserFeedbackResolver],
  exports: [FeedbackService],
})
export class FeedbackModule {}
