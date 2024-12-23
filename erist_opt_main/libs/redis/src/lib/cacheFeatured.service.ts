import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { IMainPageBlock, redisTime } from '@erist-opt/shared';

@Injectable()
export class CacheFeaturedService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setFeatureds(key: string, value: IMainPageBlock[]): Promise<void> {
    await this.cacheManager.set(key, value, {
      ttl: redisTime.featureds,
    });
  }

  async getFeatureds(key: string): Promise<IMainPageBlock[] | null> {
    const featureds = (await this.cacheManager.get(key)) as
      | IMainPageBlock[]
      | null;
    if (!featureds) {
      return null;
    }
    return featureds;
  }

  async delFeatureds(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
