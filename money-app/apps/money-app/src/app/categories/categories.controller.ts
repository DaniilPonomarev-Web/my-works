import { Controller, Get, Query } from '@nestjs/common';

import { UserService } from '@money-app/user';
import { CategoryService } from '@money-app/category';

@Controller('categories')
export class CategoriesApiController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}
  @Get('getCategoriesUser')
  async getCategoriesByChatId(@Query('chatId') chatId: number) {
    console.log(chatId);
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }
    const groupId = user.groupId;
    const categories =
      await this.categoryService.findAllExpenseByClientIdAndGroupId(
        user.accountId,
        groupId
      );
    if (!categories) {
      return null;
    }
    return categories;
  }
}
