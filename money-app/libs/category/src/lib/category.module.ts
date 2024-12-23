import { Category } from '@money-app/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
