import { Payment } from '@money-app/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
