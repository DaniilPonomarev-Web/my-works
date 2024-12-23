import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { IBanner, redisTime } from '@erist-opt/shared';

@Injectable()
export class CacheBannersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setBannersData(key: string, value: IBanner[]): Promise<void> {
    await this.cacheManager.set(key, value, {
      ttl: redisTime.banners,
    });
  }

  async getBanners(key: string): Promise<IBanner[] | null> {
    const banners = (await this.cacheManager.get(key)) as IBanner[] | null;
    if (!banners) {
      return null;
    }
    return banners;
  }

  async delBanners(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
