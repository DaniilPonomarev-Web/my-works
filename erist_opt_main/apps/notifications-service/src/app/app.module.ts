import { Module } from '@nestjs/common';

import { NotificationsController } from './notification.controller';
import { TelegramNotificationModule } from '@erist-opt/telegram-notification';
import { EmailNotificationModule } from '@erist-opt/email-notification';
import { CoreModule } from '@erist-opt/core';

@Module({
  imports: [CoreModule, TelegramNotificationModule, EmailNotificationModule],
  controllers: [NotificationsController],
  providers: [NotificationsController],
})
export class AppModule {}
