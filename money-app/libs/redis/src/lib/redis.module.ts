import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redisService';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register<any>({
      store: redisStore,
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
      password: process.env['REDIS_PASS'],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
