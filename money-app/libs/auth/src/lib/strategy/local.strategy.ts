import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    });
  }

  async validate(phone: string, password: string): Promise<any> {
    if (!/^\+7\d{10}$/.test(phone)) {
      throw new BadRequestException({
        message: 'Номер телефона должен быть в формате +7111111111',
      });
    }
    if (phone.length != 12) {
      throw new BadRequestException({
        message: 'Номер телефона должен быть 12 символов',
      });
    }
    const client = await this.authService.validateUser(phone, password);
    if (!client) {
      throw new UnauthorizedException({
        message: 'Неверный пароль',
      });
    }
    return client;
  }
}
