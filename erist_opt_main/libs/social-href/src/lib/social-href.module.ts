import { SocialHref } from '@erist-opt/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialHrefResolver } from './social-href.resolver';
import { SocialHrefService } from './social-href.service';
import { LogsModule } from '@erist-opt/logs';

@Module({
  imports: [TypeOrmModule.forFeature([SocialHref]), LogsModule],
  providers: [SocialHrefResolver, SocialHrefService],
  exports: [],
})
export class SocialHrefModule {}
