import { Module } from '@nestjs/common';
import { UserApiController } from './user.controller';
import { UserModule } from '@money-app/user';
@Module({
  imports: [UserModule],
  controllers: [UserApiController],
  providers: [],
})
export class UserApiModule {}
