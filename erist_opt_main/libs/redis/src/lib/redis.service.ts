import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ICart,
  IProductsAndCategories,
  IUserDataForResetPassword,
  IUserWithoutPass,
  redisTime,
} from '@erist-opt/shared';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setUserData(key: string, value: IUserWithoutPass): Promise<void> {
    await this.cacheManager.set(key, value, {
      ttl: redisTime.user,
    });
  }
  async getUserData(key: string): Promise<IUserWithoutPass | null> {
    const cachedValue = (await this.cacheManager.get(
      key
    )) as IUserWithoutPass | null;
    if (!cachedValue) {
      return null;
    }

    const value = {
      ...cachedValue,
      registrationDate: new Date(cachedValue.registrationDate),
      lastLogin: cachedValue.lastLogin ? new Date(cachedValue.lastLogin) : null,
    } as IUserWithoutPass;
    return value;
  }
  async delUserData(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async setSearchData(
    key: string,
    value: IProductsAndCategories
  ): Promise<void> {
    await this.cacheManager.set(key, value, {
      ttl: redisTime.search,
    });
  }
  async getSearchData(key: string): Promise<IProductsAndCategories | null> {
    const cachedValue = (await this.cacheManager.get(
      key
    )) as IProductsAndCategories | null;
    if (!cachedValue) {
      return null;
    }
    this.convertDates(cachedValue);
    return cachedValue;
  }
  private convertDates(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => this.convertDates(item));
    } else if (obj !== null && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (this.isIsoDateString(value)) {
          obj[key] = new Date(value);
        } else if (typeof value === 'object') {
          this.convertDates(value);
        }
      });
    }
  }
  private isIsoDateString(value: any): boolean {
    const isoDatePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
    return typeof value === 'string' && isoDatePattern.test(value);
  }

  /* КОРЗИНА */
  async setCartData(userId: string, cart: ICart): Promise<void> {
    await this.cacheManager.set(`cart_${userId}`, cart, {
      ttl: redisTime.card,
    });
  }

  async getCartData(userId: string): Promise<ICart | null> {
    const cartData = (await this.cacheManager.get(
      `cart_${userId}`
    )) as ICart | null;
    if (!cartData) {
      return null;
    }
    return cartData;
  }

  async deleteCartData(userId: string): Promise<void> {
    await this.cacheManager.del(`cart_${userId}`);
  }
  /* КОРЗИНА */

  /* Reset Passowrd */
  async setDataForResetPassword(
    hash: string,
    email: string,
    code: number
  ): Promise<boolean> {
    await this.cacheManager.set(
      hash,
      { email, code },
      {
        ttl: redisTime.codeResPass,
      }
    );
    const cachedData = await this.cacheManager.get(hash);

    if (cachedData) {
      return true;
    } else {
      return false;
    }
  }

  async getDataResetPassword(
    hash: string
  ): Promise<IUserDataForResetPassword | null> {
    const resetPassData = (await this.cacheManager.get(
      hash
    )) as IUserDataForResetPassword | null;
    if (!resetPassData) {
      return null;
    }
    return resetPassData;
  }

  async deleteResetPassword(hash: string): Promise<void> {
    await this.cacheManager.del(hash);
  }
  /* Reset Passowrd */

  async delSearchData(key: string): Promise<void> {
    // console.warn('Удалили товары и категории из кэша');
    await this.cacheManager.del(key);
  }

  async setTestKey(): Promise<void> {
    await this.cacheManager.set('test', 'testvalue', 5);
  }
}
