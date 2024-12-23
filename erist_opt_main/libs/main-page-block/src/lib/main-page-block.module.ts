import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainPageBlockService } from './main-page-block.service';

import { MainPageBlock } from '@erist-opt/shared';
import { ProductModule } from '@erist-opt/product';
import { MainPageBlockUserResolver } from './main-page-block-user.resolver';
import { MainPageBlockAdminResolver } from './main-page-block-admin.resolver';
import { LogsModule } from '@erist-opt/logs';
import { RedisCacheModule } from '@erist-opt/redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([MainPageBlock]),
    ProductModule,
    RedisCacheModule,
    LogsModule,
  ],
  providers: [
    MainPageBlockService,
    MainPageBlockAdminResolver,
    MainPageBlockUserResolver,
  ],
  exports: [MainPageBlockService],
})
export class MainPageBlockModule {}
