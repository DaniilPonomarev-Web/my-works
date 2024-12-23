import { Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { CacheBannersService } from './cacheBanners.service';
import { CacheFeaturedService } from './cacheFeatured.service';
import { CacheCategoryService } from './cacheCategory.service';
// import { BullModule } from '@nestjs/bull';

@Global()
@Module({
  imports: [
    CacheModule.register<any>({
      isGlobal: true,
      store: redisStore,
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
      password: process.env['REDIS_PASS'],
    }),
  ],
  providers: [
    RedisService,
    CacheBannersService,
    CacheFeaturedService,
    CacheCategoryService,
  ],
  exports: [
    RedisService,
    CacheBannersService,
    CacheFeaturedService,
    CacheCategoryService,
  ],
})
export class RedisCacheModule {}
