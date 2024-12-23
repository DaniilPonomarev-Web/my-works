import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule, UptimeController } from '@money-app/core';
import { CoreResolver } from '@money-app/core';

import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from '@money-app/redis';
import { RabbitModule } from '@money-app/rabbit';
import { YookassaModule } from '@money-app/yookassa';

import * as redisStore from 'cache-manager-redis-store';
import { MoneyAppMessagePattern } from './rabbit.message';
import { CategoryModule } from '@money-app/category';
import { GroupModule } from '@money-app/group';
import { PaymentsModule } from '@money-app/payments';
import { UserModule } from '@money-app/user';
import { AccountModule } from '@money-app/account';
import { ProverkachekaModule } from '@money-app/proverkacheka';
import { AuthModule } from '@money-app/auth';
import { UserApiModule } from './user/user.module';
import { CategoriesApiModule } from './categories/categories.module';
import { GroupsApiModule } from './groups/groups.module';
import { FinancesApiModule } from './finances/finances.module';
import { SubscribeApiModule } from './subscribe/subscribe.module';

@Module({
  imports: [
    CoreModule,
    CacheModule.register<any>({
      isGlobal: true,
      store: redisStore,
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
      password: process.env['REDIS_PASS'],
    }),
    RabbitModule,

    CategoryModule,
    GroupModule,
    AccountModule,
    PaymentsModule,
    ProverkachekaModule,
    UserModule,
    AuthModule,
    YookassaModule,

    UserApiModule,
    CategoriesApiModule,
    GroupsApiModule,
    FinancesApiModule,
    SubscribeApiModule,
    GroupsApiModule,
  ],
  controllers: [AppController, MoneyAppMessagePattern, UptimeController],
  providers: [AppService, RedisService, CoreResolver],
})
export class AppModule {}
