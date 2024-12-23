import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env['SMTP_HOST'],
        port: 465,
        // pool: true,
        secure: true,
        auth: {
          user: process.env['SMTP_LOGIN'],
          pass: process.env['SMTP_PASS'],
        },
      },
    }),
  ],
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderModule {}
