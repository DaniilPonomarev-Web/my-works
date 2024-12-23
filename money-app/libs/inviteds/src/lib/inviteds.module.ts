import { Inviteds } from '@money-app/entities';
import { RabbitModule } from '@money-app/rabbit';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitedsResolver } from './inviteds.resolver';
import { InvitedsService } from './inviteds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inviteds]), RabbitModule],
  providers: [InvitedsResolver, InvitedsService],
  exports: [InvitedsService],
})
export class InvitedsModule {}
