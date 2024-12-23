import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard extends AuthGuard('local') {
  constructor(private jwtService: JwtService, private config: ConfigService) {
    super();
  }
  override canActivate(context: ExecutionContext) {    
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const user = this.jwtService.verify(
          token,
          this.config.get('JWT_SECRET')
        );
        ctx.user = user;
        return true;
      } catch (error) {
        throw new HttpException('invalid token: ', HttpStatus.UNAUTHORIZED);
      }
    } else {
      return false;
    }
  }
}
