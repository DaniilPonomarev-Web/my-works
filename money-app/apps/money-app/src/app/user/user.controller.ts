import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '@money-app/user';
import { IUser } from '@money-app/entities';

@Controller('user')
export class UserApiController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('info')
  async getUserByChatId(@Query('chatId') chatId: number): Promise<IUser| null> {
    console.log(chatId);
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }
    return user;
  }
}
