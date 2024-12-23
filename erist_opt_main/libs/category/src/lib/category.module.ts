import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryDescription } from './entities/category-description.entity';
import { CategoryAdminResolver } from './categoryAdmin.resolver';
import { CategoryAdminService } from './categoryAdmin.service';
import { CategoryUserResolver } from './categoryUser.resolver';
import { CategoryUserService } from './categoryUser.service';
import { CategoryOneCService } from './categoryOneC.service';
import { LogsModule } from '@erist-opt/logs';
import { RedisCacheModule } from '@erist-opt/redis';
import { Notification1cModule } from '@erist-opt/notification-1c';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CategoryDescription]),
    LogsModule,
    RedisCacheModule,
    Notification1cModule,
  ],
  providers: [
    CategoryUserService,
    CategoryOneCService,
    CategoryAdminService,
    CategoryAdminResolver,
    CategoryUserResolver,
  ],
  exports: [CategoryUserService, CategoryAdminService, CategoryOneCService],
})
export class CategoryModule {}
