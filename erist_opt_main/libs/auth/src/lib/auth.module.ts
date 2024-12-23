import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtUserModule } from '@erist-opt/jwt-user';
import { UserModule } from '@erist-opt/user';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { LogsModule } from '@erist-opt/logs';
@Module({
  imports: [JwtUserModule, UserModule, LogsModule],
  providers: [AuthService, AuthResolver, JwtStrategy, LocalStrategy],
  exports: [JwtStrategy, LocalStrategy],
})
export class AuthModule {}
