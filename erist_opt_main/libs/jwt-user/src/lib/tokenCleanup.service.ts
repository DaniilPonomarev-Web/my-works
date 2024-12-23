import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RefreshToken } from '@erist-opt/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

/**
 * Сервис для очистки устаревших и неактуальных токенов из базы данных.
 */
@Injectable()
export class TokenCleanupService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  /**
   * Удаляет все refresh токены, принадлежащие указанному пользователю.
   * @param userId Идентификатор пользователя, для которого должны быть удалены refresh токены.
   * @returns Promise<void>
   *
   * Эта функция используется для удаления всех refresh токенов, принадлежащих указанному пользователю.
   * Это полезно, когда пользователь выполняет повторную авторизацию, и старые токены должны быть
   * аннулированы для предотвращения несанкционированного доступа.
   */
  async deleteTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
  }

  /**
   * Удаляет все истекшие refresh токены из базы данных.
   *
   * @returns {Promise<void>} Промис, который разрешается, когда истекшие токены успешно удалены.
   *
   * Эта функция запускается автоматически каждый день в полночь благодаря аннотации @Cron.
   * Она удаляет все refresh токены, срок действия которых истек. Это помогает поддерживать
   * базу данных в чистоте и уменьшает количество неактуальных данных.
   */
  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const now = new Date();
    await this.refreshTokenRepository.delete({ expiresAt: LessThan(now) });
  }
}