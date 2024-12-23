import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { TelegramModule } from '@money-app/telegram';
import { AccountModule } from '@money-app/account';
import { RabbitModule } from '@money-app/rabbit';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TelegramModule,
    AccountModule,
    RabbitModule,
  ],
  providers: [CronService],
})
export class CronModule {}
