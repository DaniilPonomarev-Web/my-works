import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    const tokenExpired = Date.now() > payload.exp * 1000;
    if (tokenExpired) {
      throw new UnauthorizedException('Token истек');
    }
    // const client = await this.clientService.getByPhone(payload.sub);
    // return client;
    return;
  }
}
