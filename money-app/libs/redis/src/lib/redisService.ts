import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TELEGRAM_SESSION } from './redis.keys';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

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

  async generateAndCacheInviteLink(
    hashedphone: string,
    data: any
  ): Promise<string> {
    try {
      // Генерируем и кешируем ссылку с данными
      const inviteLink = `https://t.me/cskapd_bot?start=${hashedphone}`;
      const cacheData = {
        phone: data.phone,
        username: data.username,
        message: data.message,
      };

      await this.cacheManager.set(hashedphone, cacheData, 3600); // 3600 секунд = 1 час

      return inviteLink;
    } catch (error) {
      this.logger.error(
        'Ошибка при генерации ссылки и кешировании данных:',
        error
      );
      throw new Error('Ошибка при генерации ссылки и кешировании данных');
    }
  }

  async getInvitationData(phone: string): Promise<{
    phone: string;
    username: string;
    message: string;
  } | null> {
    try {
      const cachedData = await this.cacheManager.get<{
        phone: string;
        username: string;
        message: string;
      }>(phone);
      return cachedData || null;
    } catch (error) {
      this.logger.error('Ошибка при получении данных из кеша:', error);
      throw new Error('Ошибка при получении данных из кеша');
    }
  }
}
