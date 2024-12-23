import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailNotificationService } from './email-notification.service';
import { LogsModule } from '@erist-opt/logs';

@Module({
  imports: [
    LogsModule,
    MailerModule.forRoot({
      transport: {
        host: process.env['SMTP_HOST'],
        port: process.env['SMTP_PORT']
          ? parseInt(process.env['SMTP_PORT'], 10)
          : 465,
        pool: true,
        secure: true,
        auth: {
          user: process.env['SMTP_LOGIN'],
          pass: process.env['SMTP_PASS'],
        },
      },
    }),
  ],
  providers: [EmailNotificationService],
  exports: [EmailNotificationService],
})
export class EmailNotificationModule {}
