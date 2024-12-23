import { ConfigurationRedis } from './../config/configuration';
import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redis = configService.get<ConfigurationRedis>('redis');
        return {
          store: redisStore,
          host: redis.host,
          port: redis.port,
          password: redis.psw,
          ttl: 0,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheDlModule {}
