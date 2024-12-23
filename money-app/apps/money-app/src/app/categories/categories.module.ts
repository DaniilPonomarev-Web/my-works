import { Module } from '@nestjs/common';
import { CategoriesApiController } from './categories.controller';
import { CategoryModule } from '@money-app/category';
import { UserModule } from '@money-app/user';
@Module({
  imports: [UserModule, CategoryModule],
  controllers: [CategoriesApiController],
  providers: [],
})
export class CategoriesApiModule {}
