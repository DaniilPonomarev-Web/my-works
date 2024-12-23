import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '@money-app/user';
import { IGroup, IUser } from '@money-app/entities';
import { GroupService } from '@money-app/group';

@Controller('groups')
export class GroupsApiController {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService
  ) {}

  @Get('getList')
  async getGroupsyChatId(
    @Query('chatId') chatId: number
  ): Promise<IGroup[] | IGroup | null> {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    if (user.role === 'admin') {
      const groups = await this.groupService.findAllByAccountId(user.accountId);
      return groups;
    }
    if (user.role === 'user') {
      const group = await this.groupService.findOne(user.groupId);
      return [group];
    }
    return null;
  }

  @Get('getAllUsersByGroupId')
  async getAllUsersByGroupId(
    @Query('groupId') groupId: string
  ): Promise<IUser | IUser[] | null> {
    const users = await this.userService.getAllUsersByGroupId(groupId);

    return users;
  }

  @Get('getListWithUsers')
  async getGroupsAndUsersByChatId(
    @Query('chatId') chatId: number
  ): Promise<any> {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    let groups: any;

    if (user.role === 'admin') {
      groups = await this.groupService.findAllByAccountId(user.accountId);
    }
    if (user.role === 'user') {
      const group = await this.groupService.findOne(user.groupId);
      groups = group;
      // Для каждой группы получаем пользователей
    }
    for (const group of groups) {
      const users = await this.userService.getAllUsersByGroupId(group.id);
      group.users = users;
    }
    return groups;
  }
}
