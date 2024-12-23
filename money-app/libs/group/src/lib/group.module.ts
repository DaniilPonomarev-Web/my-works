import { Group } from '@money-app/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { RabbitModule } from '@money-app/rabbit';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), RabbitModule],
  providers: [GroupService, GroupResolver],
  exports: [GroupService],
})
export class GroupModule {}
