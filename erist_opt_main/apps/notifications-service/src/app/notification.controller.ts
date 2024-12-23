import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { EmailNotificationService } from '@erist-opt/email-notification';
import { TelegramNotificationService } from '@erist-opt/telegram-notification';
import {
  NOTIFICATION_EMAIL_NEW_ORDER,
  NOTIFICATION_EMAIL_NEW_ORDER_ADMIN,
  NOTIFICATION_EMAIL_NEW_USER,
  NOTIFICATION_EMAIL_RESET_PASSWORD,
  NOTIFICATION_TELEGRAM_1C_EXCHANGE,
  NOTIFICATION_TELEGRAM_ACTION_ORDER,
  NOTIFICATION_TELEGRAM_NEW_ORDER,
  NOTIFICATION_TELEGRAM_NEW_USER,
  OrderDTO,
} from '@erist-opt/shared';

@Controller()
export class NotificationsController {
  constructor(
    private readonly telegramNotificationService: TelegramNotificationService,
    private readonly emailNotificationService: EmailNotificationService
  ) {}
  @EventPattern(NOTIFICATION_TELEGRAM_NEW_USER)
  async notificationTelegramNewUser(@Payload() message: any) {
    const notificationMessage = message.toString();
    console.debug();
    try {
      await this.telegramNotificationService.sendMessageNewUser(
        notificationMessage
      );
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
    }
  }

  @EventPattern(NOTIFICATION_EMAIL_NEW_USER)
  async notificationEmailNewUser(@Payload() message: any) {
    const notificationMessage = message.toString();
    try {
      await this.emailNotificationService.sendMessageRegistration(
        notificationMessage
      );
    } catch (error) {
      console.error('Error sending Email:', error);
    }
  }

  @EventPattern(NOTIFICATION_TELEGRAM_NEW_ORDER)
  async notificationTelegramNewOrder(@Payload() message: any) {
    const notificationMessage = message.toString();
    try {
      await this.telegramNotificationService.sendMessageNewOrders(
        notificationMessage
      );
    } catch (error) {
      console.error('Error sending Email:', error);
    }
  }

  @EventPattern(NOTIFICATION_EMAIL_NEW_ORDER)
  async notificationEmailNewOrder(@Payload() data: any) {
    try {
      const order: OrderDTO =
        typeof data.value === 'string' ? JSON.parse(data) : data;
      await this.emailNotificationService.sendMessageNewOrder(order);
    } catch (error) {
      console.error('Error sending Email:', error);
    }
  }

  @EventPattern(NOTIFICATION_EMAIL_NEW_ORDER_ADMIN)
  async notificationEmailNewOrderAdmin(@Payload() data: any) {
    try {
      const order: OrderDTO =
        typeof data.value === 'string' ? JSON.parse(data) : data;
      await this.emailNotificationService.sendMessageNewOrderAdmin(order);
    } catch (error) {
      console.error('Error sending Email:', error);
    }
  }

  @EventPattern(NOTIFICATION_TELEGRAM_ACTION_ORDER)
  async notificationTelegramActionOrder(@Payload() message: any) {
    const notificationMessage = message.toString();
    console.debug();
    try {
      await this.telegramNotificationService.sendMessageEditOrders(
        notificationMessage
      );
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
    }
  }

  @EventPattern(NOTIFICATION_EMAIL_RESET_PASSWORD)
  async notificationEmailResetPassword(@Payload() data: any) {
    try {
      const emailSent =
        await this.emailNotificationService.sendMessageResetPassword(data);
      if (!emailSent) {
        console.error('Failed to send reset password email');
      }
    } catch (error) {
      console.error('Error sending Email:', error);
    }
  }

  @EventPattern(NOTIFICATION_TELEGRAM_1C_EXCHANGE)
  async notificationTelegramOneCExchange(@Payload() message: any) {
    const notificationMessage = message.toString();
    try {
      await this.telegramNotificationService.sendNotificationToTelegramOneCExchange(
        notificationMessage
      );
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
    }
  }
}
