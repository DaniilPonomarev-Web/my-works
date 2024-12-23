import { Module } from '@nestjs/common';
import { UserModule } from '@money-app/user';
import { GroupModule } from '@money-app/group';
import { GroupsApiController } from './groups.controller';
@Module({
  imports: [UserModule, GroupModule],
  controllers: [GroupsApiController],
  providers: [],
})
export class GroupsApiModule {}
