import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenCleanupCustomerService } from './tokenCleanup.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICustomer,
  LoginResponseDTO,
  RefreshTokenCustomer,
} from '@erist-opt/shared';

@Injectable()
export class JwtCustomerService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenCleanupCustomerService: TokenCleanupCustomerService,
    @InjectRepository(RefreshTokenCustomer)
    private readonly refreshTokenRepository: Repository<RefreshTokenCustomer>
  ) {}

  async generateTokens(customer: ICustomer): Promise<LoginResponseDTO> {
    const accessToken = await this.generateAccessToken(customer);
    const refreshToken = await this.generateRefreshToken(customer);
    return {
      access_token: accessToken,
      refresh_token: refreshToken.token,
    };
  }

  /**
   * Генерирует новый access токен для пользователя.
   * @param customer @interface ICustomer Объект пользователя.
   * @returns {string} Новый access токен.
   *
   * Этот метод создает новый access токен с использованием данных пользователя и возвращает его.
   */
  async generateAccessToken(customer: ICustomer) {
    return this.jwtService.sign(
      { id: customer.id, login: customer.login },
      {
        expiresIn: process.env['JWT_TIME_CUSTOMER'],
        algorithm: 'RS256',
      }
    );
  }

  /**
   * Генерирует новый refresh токен для пользователя.
   * @param customer Объект пользователя.
   * @returns {Promise<RefreshToken>} Промис с объектом RefreshToken.
   *
   * Этот метод создает новый refresh токен, устанавливает срок его действия и сохраняет его в базе данных.
   */
  private async generateRefreshToken(
    customer: ICustomer
  ): Promise<RefreshTokenCustomer> {
    const expiresIn = new Date();
    const longJwtTime = process.env['LONG_JWT_TIME_CUSTOMER'];

    if (longJwtTime) {
      expiresIn.setTime(
        expiresIn.getTime() + this.parseTimeString(longJwtTime)
      );
    }

    const tokenPayload = { id: customer.id, login: customer.login };
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: process.env['LONG_JWT_TIME_CUSTOMER'] || '30d',
      algorithm: 'RS256',
    });

    const refreshTokenEntity = this.refreshTokenRepository.create({
      customer,
      token: refreshToken,
      expiresAt: expiresIn,
    });

    return this.refreshTokenRepository.save(refreshTokenEntity);
  }

  private parseTimeString(timeString: any) {
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

  async deleteTokens(customerId: string): Promise<void> {
    await this.tokenCleanupCustomerService.deleteTokens(customerId);
  }

  async refreshToken(token: string): Promise<LoginResponseDTO | null> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['customer'],
    });

    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      return null;
    }

    await this.refreshTokenRepository.remove(refreshToken);

    const newAccessToken = await this.generateAccessToken(
      refreshToken.customer
    );
    const newRefreshToken = await this.generateRefreshToken(
      refreshToken.customer
    );
    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken.token,
    };
  }

  async verifyTokenCustomer(token: string) {
    try {
      await this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
