import {
  User,
  UserAddress,
  UserAgreement,
  UserCompany,
} from '@erist-opt/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { KafkaModule } from '@erist-opt/kafka';
import { UserService } from './user.service';
import { RedisCacheModule } from '@erist-opt/redis';
import { UserAdminService } from './userAdmin.service';
import { UserAdminResolver } from './userAdmin.resolver';
import { JwtUserModule } from '@erist-opt/jwt-user';
import { LogsModule } from '@erist-opt/logs';
import { DadataModule } from '@erist-opt/dadata';

@Module({
  imports: [
    JwtUserModule,
    TypeOrmModule.forFeature([User, UserAddress, UserCompany, UserAgreement]),
    KafkaModule,
    LogsModule,
    RedisCacheModule,
    DadataModule,
  ],
  providers: [UserService, UserResolver, UserAdminService, UserAdminResolver],
  exports: [UserService, UserAdminService],
})
export class UserModule {}
