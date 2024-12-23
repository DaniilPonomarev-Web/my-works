import { IUser, LoginResponseDTO, RefreshToken } from '@erist-opt/shared';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenCleanupService } from './tokenCleanup.service';
import { AppLoggerLoki } from '@erist-opt/logs';

@Injectable()
export class JwtUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenCleanupService: TokenCleanupService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private AppLoggerLoki: AppLoggerLoki
  ) {}

  async generateTokens(user: IUser): Promise<LoginResponseDTO> {
    this.AppLoggerLoki.log(
      `Генерация токенов для пользователя ID=${user.id}`,
      'api'
    );
    try {
      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      this.AppLoggerLoki.log(
        `Токены успешно сгенерированы для пользователя ID=${user.id}`,
        'api'
      );
      return {
        access_token: accessToken,
        refresh_token: refreshToken.token,
      };
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при генерации токенов для пользователя ID=${user.id}: ${error.message}`,
        'api'
      );
      throw error;
    }
  }

  /**
   * Генерирует новый access токен для пользователя.
   * @param user Объект пользователя.
   * @returns {string} Новый access токен.
   *
   * Этот метод создает новый access токен с использованием данных пользователя и возвращает его.
   */
  async generateAccessToken(user: IUser) {
    this.AppLoggerLoki.log(
      `Генерация access токена для пользователя ID=${user.id}`,
      'api'
    );
    console.log(process.env['JWT_TIME']);
    try {
      const token = this.jwtService.sign(
        { id: user.id, email: user.email },
        {
          expiresIn: process.env['JWT_TIME'],
          algorithm: 'RS256',
        }
      );
      this.AppLoggerLoki.log(
        `Access токен успешно сгенерирован для пользователя ID=${user.id}`,
        'api'
      );
      return token;
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при генерации access токена для пользователя ID=${user.id}: ${error.message}`,
        'api'
      );
      throw error;
    }
  }

  /**
   * Генерирует новый refresh токен для пользователя.
   * @param user Объект пользователя.
   * @returns {Promise<RefreshToken>} Промис с объектом RefreshToken.
   *
   * Этот метод создает новый refresh токен, устанавливает срок его действия и сохраняет его в базе данных.
   */
  private async generateRefreshToken(user: IUser): Promise<RefreshToken> {
    this.AppLoggerLoki.log(
      `Генерация refresh токена для пользователя ID=${user.id}`,
      'api'
    );
    try {
      const expiresIn = new Date();
      const longJwtTime = process.env['LONG_JWT_TIME'];

      if (longJwtTime) {
        expiresIn.setTime(
          expiresIn.getTime() + this.parseTimeString(longJwtTime)
        );
      }

      const tokenPayload = { id: user.id, email: user.email };
      const refreshToken = this.jwtService.sign(tokenPayload, {
        expiresIn: process.env['LONG_JWT_TIME'] || '30d',
        algorithm: 'RS256',
      });

      const refreshTokenEntity = this.refreshTokenRepository.create({
        user,
        token: refreshToken,
        expiresAt: expiresIn,
      });

      await this.refreshTokenRepository.save(refreshTokenEntity);
      this.AppLoggerLoki.log(
        `Refresh токен успешно сгенерирован и сохранен для пользователя ID=${user.id}`,
        'api'
      );
      return refreshTokenEntity;
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при генерации refresh токена для пользователя ID=${user.id}: ${error.message}`,
        'api'
      );
      throw error;
    }
  }

  private parseTimeString(timeString: any) {
    this.AppLoggerLoki.log(`Парсинг строки времени: ${timeString}`, 'api');
    const value = parseInt(timeString, 10);
    const unit = timeString.replace(value, '').toLowerCase();

    switch (unit) {
      case 'm':
        return value * 60 * 1000; // минуты в миллисекунды
      case 'h':
        return value * 60 * 60 * 1000; // часы в миллисекунды
      case 'd':
        return value * 24 * 60 * 60 * 1000; // дни в миллисекунды
      default:
        throw new Error(`Неподдерживаемый формат времени: ${unit}`);
    }
  }

  async deleteTokens(userId: string): Promise<void> {
    this.AppLoggerLoki.log(
      `Удаление токенов для пользователя ID=${userId}`,
      'api'
    );
    try {
      await this.tokenCleanupService.deleteTokens(userId);
      this.AppLoggerLoki.log(
        `Токены успешно удалены для пользователя ID=${userId}`,
        'api'
      );
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при удалении токенов для пользователя ID=${userId}: ${error.message}`,
        'api'
      );
      throw error;
    }
  }

  async refreshToken(token: string): Promise<LoginResponseDTO | null> {
    this.AppLoggerLoki.log(`Обновление токена: ${token}`, 'api');
    try {
      const refreshToken = await this.refreshTokenRepository.findOne({
        where: { token },
        relations: ['user'],
      });

      if (!refreshToken || refreshToken.expiresAt < new Date()) {
        this.AppLoggerLoki.log(
          `Refresh токен недействителен или истек: `, //${token}
          'api'
        );
        return null;
      }

      await this.refreshTokenRepository.remove(refreshToken);

      const newAccessToken = await this.generateAccessToken(refreshToken.user);
      const newRefreshToken = await this.generateRefreshToken(
        refreshToken.user
      );
      this.AppLoggerLoki.log(
        `Токен успешно обновлен для пользователя ID=${refreshToken.user.id}`,
        'api'
      );
      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken.token,
      };
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при обновлении токена: , ошибка: ${error.message}`, //${token}
        'api'
      );
      return null;
    }
  }

  async verifyTokenUser(token: string) {
    this.AppLoggerLoki.log(`Проверка токена: `, 'api'); //${token}
    try {
      await this.jwtService.verify(token);
      this.AppLoggerLoki.log(`Токен успешно проверен`, 'api'); //${token}
      return true;
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка проверки токена: , ошибка: ${error.message}`, //${token}
        'api'
      );
      return false;
    }
  }
}
