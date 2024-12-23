import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ICategory, redisTime } from '@erist-opt/shared';

@Injectable()
export class CacheCategoryService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCategory(key: string, value: ICategory): Promise<void> {
    await this.cacheManager.set(key, value, {
      ttl: redisTime.featureds,
    });
  }

  async getCategory(key: string): Promise<ICategory | null> {
    const category = (await this.cacheManager.get(key)) as ICategory | null;
    if (!category) {
      return null;
    }
    return category;
  }

  async delCategory(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async getCategoriesTree(key: string): Promise<ICategory[] | null> {
    const categoriesTreeCache = (await this.cacheManager.get(key)) as
      | ICategory[]
      | null;
    if (!categoriesTreeCache) {
      return null;
    }
    return categoriesTreeCache;
  }

  async setCategoriesTree(key: string, value: ICategory[]): Promise<void> {
    await this.cacheManager.set(key, value, {
      ttl: redisTime.featureds,
    });
  }
  async delCategoriesTree(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async delAllCategories(): Promise<void> {
    if (!this.cacheManager) {
      throw new Error('CacheManager is not defined');
    }
    const keys = await this.cacheManager.store.keys!('cat_*');
    // console.warn(keys);

    await Promise.all(keys!.map((key: any) => this.cacheManager!.del(key)));
  }
}
