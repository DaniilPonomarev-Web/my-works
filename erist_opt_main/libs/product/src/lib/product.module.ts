import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@erist-opt/auth';
import { ProductAdminService } from './productAdmin.service';
import { ProductUserService } from './productUser.service';

import { ProductUserResolver } from './productUser.resolver';
import { ProductAdminResolver } from './productAdmin.resolver';

import { OptionModule } from '@erist-opt/options';
import {
  OtherColorProducts,
  Product,
  ProductDescription,
  ProductImage,
  ProductOptionValue,
  ProductsRelated,
} from '@erist-opt/shared';
import { ProductImageService } from './productImage.service';
import { MinioLocalModule } from '@erist-opt/minio';
import { ProductOneCService } from './productOneC.service';
import { CategoryModule } from '@erist-opt/category';
import { LogsModule } from '@erist-opt/logs';
import { RedisCacheModule } from '@erist-opt/redis';
import { Notification1cModule } from '@erist-opt/notification-1c';
@Module({
  imports: [
    AuthModule,
    OptionModule,
    TypeOrmModule.forFeature([
      Product,
      ProductDescription,
      ProductImage,
      ProductOptionValue,
      ProductsRelated,
      OtherColorProducts,
    ]),
    CategoryModule,
    LogsModule,
    RedisCacheModule,
    MinioLocalModule,
    Notification1cModule,
  ],
  providers: [
    ProductUserService,
    ProductAdminService,
    ProductUserResolver,
    ProductAdminResolver,
    ProductImageService,
    ProductOneCService,
  ],
  exports: [
    ProductUserService,
    ProductOneCService,
    ProductAdminService,
    ProductImageService,
  ],
})
export class ProductModule {}
