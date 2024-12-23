import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GET_CATEGORIES_BYGROUP, GET_GROUPS } from '@money-app/shared';
import { CategoryService } from '@money-app/category';
import { GroupService } from '@money-app/group';

@Controller()
export class MoneyAppMessagePattern {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly groupService: GroupService
  ) {}

  /**
  Получить информацию о граппух
  * @param payload - clientID
  */
  @MessagePattern({ cmd: GET_GROUPS })
  async getgroups(@Payload() payload): Promise<any> {
    const result = await this.groupService.findAllByAccountId(payload);
    if (!result) {
      return null;
    }
    return result;
  }

  /**
  Получить информацию о категориях по id группы
  * @param payload - clientID
  * @param payload - groupId
  */
  @MessagePattern({ cmd: GET_CATEGORIES_BYGROUP })
  async getCategories(@Payload() payload): Promise<any> {
    const result = await this.categoryService.findAllByClientIdAndGroupId(
      payload.clientId,
      payload.groupId
    );

    if (!result) {
      return null;
    }
    return result;
  }
}
