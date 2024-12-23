import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { OptionModule } from '@erist-opt/options';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from '@erist-opt/product';

@Module({
  imports: [ScheduleModule.forRoot(), OptionModule, ProductModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
