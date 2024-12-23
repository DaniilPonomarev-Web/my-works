import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { InviteEmail } from '@money-app/shared';

import { emailMessageTemplates } from './message-text';

@Injectable()
export class MailSenderService {
  private readonly logger = new Logger(MailSenderService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMessageInvite(data: InviteEmail) {
    // Если отправка сообщений отключена, просто выходим из функции
    if (process.env['SENDING_MESSAGES'] === 'false') {
      return;
    }

    this.logger.debug(`Sending an invitation to ${data.email}`);
    try {
      // Отправка приглашения
      return await this.mailerService.sendMail(this.builderMail(data));
    } catch (error) {
      // Если произошла ошибка при отправке, просто возвращаем null
      return null;
    }
  }

  /**
   * Собрать сообщение для отправки
   * @param data Данные письма
   * @returns
   */
  private builderMail(data: InviteEmail) {
    const mailData: ISendMailOptions = {
      from: process.env['SEND_EMAIL'],
      to: data.email,
      subject: emailMessageTemplates.subjectNewInviteRequest(),
      text: emailMessageTemplates.messageNewInviteRequest(data),
    };

    return mailData;
  }
}
