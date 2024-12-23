import { Banner } from '@erist-opt/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerService } from './banner.service';
import { BannerAdminResolver } from './bannerAdmin.resolver';
import { BannerUserResolver } from './bannerUser.resolver';
import { MinioLocalModule } from '@erist-opt/minio';
import { LogsModule } from '@erist-opt/logs';
import { RedisCacheModule } from '@erist-opt/redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner]),
    MinioLocalModule,
    LogsModule,
    RedisCacheModule,
  ],
  providers: [BannerService, BannerUserResolver, BannerAdminResolver],
  exports: [BannerService],
})
export class BannerModule {}
