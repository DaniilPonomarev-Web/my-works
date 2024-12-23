import { User } from '@money-app/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UsersResolver } from './user.resolver';
import { RedisService } from '@money-app/redis';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UsersResolver, RedisService],
  exports: [UserService],
})
export class UserModule {}
