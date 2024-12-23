import { Module } from '@nestjs/common';

import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisService } from '@money-app/redis';
import { CoreModule } from '@money-app/core';
import { TelegramModule } from '@money-app/telegram';
import { UserModule } from '@money-app/user';
import { RabbitModule } from '@money-app/rabbit';
import { SettingModule } from '@money-app/setting';
import { InvitedsModule } from '@money-app/inviteds';
import { MailSenderModule } from '@money-app/mail-sender';
import { YookassaModule } from '@money-app/yookassa';
import { CronModule } from '@money-app/cron';
import { LoggerLokiModule } from '@money-app/logger-loki';

@Module({
  imports: [
    CoreModule,
    SettingModule,
    CacheModule.register<any>({
      isGlobal: true,
      store: redisStore,
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
      password: process.env['REDIS_PASS'],
    }),
    MailSenderModule,
    TelegramModule,
    UserModule,
    RabbitModule,
    InvitedsModule,
    YookassaModule,
    CronModule,
    LoggerLokiModule,
  ],
  providers: [RedisService],
})
export class AppModule {}
