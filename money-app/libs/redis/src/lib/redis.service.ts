import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TELEGRAM_SESSION } from './redis.keys';
import * as crypto from 'crypto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CategoryHashData, IInviteHrefInterface } from '@money-app/shared';
import { IInviteds, IUser } from '@money-app/entities';

const botName = process.env['TELEGRAM_BOT_USERNAME'];
@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Сохранить данные сессии телеграм
   * @param stringSession Строка сессии
   * @returns
   */
  saveSessionTelegram(stringSession: string) {
    return this.cacheManager.set(TELEGRAM_SESSION, stringSession);
  }

  /**
   * Получить строку сессии
   * @returns
   */
  getSessionTelegram(): Promise<any> {
    return this.cacheManager.get(TELEGRAM_SESSION);
  }

  /**
   * Получить строку сессии
   * @returns
   */
  delSessionTelegram(): Promise<any> {
    return this.cacheManager.del(TELEGRAM_SESSION);
  }

  async setCategoryButton(categoryId: string, categoryName: string) {
    const cacheData = { categoryId, categoryName };
    const ttl = 1000;
    await this.cacheManager.set(categoryId, cacheData, {
      ttl: ttl,
    });

    return categoryId;
  }
  async getCategoryButton(cahedCategory: string): Promise<any | null> {
    const category = await this.cacheManager.get(cahedCategory);
    if (!category) {
      return null;
    }
    return category;
  }

  async setEditGroupButton(
    groupId: string,
    groupName: string,
    chatIdUser: number
  ) {
    const cacheData = { groupId, groupName, chatIdUser };
    const ttl = 3600 * 3600;
    const key = `editGroup${groupId}`;
    await this.cacheManager.set(key, cacheData, {
      ttl: ttl,
    });

    return key;
  }
  async getEditGroupButton(key: string): Promise<any | null> {
    const groupButton = await this.cacheManager.get(key);
    if (!groupButton) {
      return null;
    }
    return groupButton;
  }

  async setInvitionButton(invite: IInviteds) {
    const ttl = 3600 * 3600;
    const keyInvite = `invite${invite.id}`;
    await this.cacheManager.set(keyInvite, invite, {
      ttl: ttl,
    });
    return keyInvite;
  }
  async getInvitionButton(keyInvite: string): Promise<IInviteds | null> {
    const invite = await this.cacheManager.get<IInviteds>(keyInvite);
    if (!invite) {
      return null;
    }
    return invite;
  }

  async generateAndCacheInviteLink(
    hashedphone: string,
    payload: IInviteHrefInterface
  ): Promise<string> {
    try {
      // Генерируем и кешируем ссылку с данными
      const inviteLink = `https://t.me/${botName}?start=${hashedphone}`;
      const cacheData = payload;
      const ttl = 3600 * 24;
      await this.cacheManager.set(hashedphone, cacheData, {
        ttl: ttl,
      });
      return inviteLink;
    } catch (error) {
      this.logger.error(
        'Ошибка при генерации ссылки и кешировании данных:',
        error
      );
      throw new Error('Ошибка при генерации ссылки и кешировании данных');
    }
  }

  async getInvitationData(phone: string): Promise<IInviteHrefInterface | null> {
    try {
      const cachedData = await this.cacheManager.get<IInviteHrefInterface>(
        phone
      );
      if (!cachedData) {
        return null;
      }

      return cachedData;
    } catch (error) {
      this.logger.error('Ошибка при получении данных из кеша:', error);
      throw new Error('Ошибка при получении данных из кеша');
    }
  }

  async deleteInvationData(phone: string) {
    try {
      const deleteInvationData = await this.cacheManager.del(phone);
      return deleteInvationData;
    } catch (error) {
      this.logger.error('Ошибка при получении данных из кеша:', error);
      throw new Error('Ошибка при получении данных из кеша');
    }
  }

  // async setUserCache(userData: IUser, keyId: string) {
  //   const ttl = 3600 * 3600;
  //   await this.cacheManager.set(keyId, userData, {
  //     ttl: ttl,
  //   });
  // }

  // async getUserCache(keyId: string): Promise<IUser | null> {
  //   const user = await this.cacheManager.get(keyId);
  //   if (!user) {
  //     return null;
  //   }
  //   return user;
  // }
}
