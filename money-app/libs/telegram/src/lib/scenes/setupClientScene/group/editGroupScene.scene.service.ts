import { AccountService } from '@money-app/account';
import { GramService } from '@money-app/gram';
import { GroupService } from '@money-app/group';
import { Injectable, Logger } from '@nestjs/common';
import { messageForScenes } from '../../../message.patterns';
import { CategoryService } from '@money-app/category';
import { ICategoryInput, defaultCategories } from '@money-app/shared';
import { ICategory } from '@money-app/entities';

@Injectable()
export class EditGroupSceneService {
  private logger = new Logger(EditGroupSceneService.name);

  constructor(
    private readonly accountService: AccountService,

    private readonly groupService: GroupService,
    private readonly categoryService: CategoryService,
    private readonly gramService: GramService
  ) {}

  /**
   * Получить группу
   * @param chatId ID чата пользователя
   * @param accountId ID Аккаунта
   * @param groupName Имя группы
   * @param categoriesNames ID категорий или категории
   * @param defaultCat дефолтные категории
   *
   * @returns
   */
  async createGroup(
    chatId: number,
    accountId: string,
    groupName: string,
    categoriesNames: string[],
    defaultCat: boolean
  ) {
    const group = await this.groupService.create(accountId, groupName);

    if (!group) {
      this.logger.error(`chatId: ${chatId}, message: group not create`);
      throw Error(messageForScenes.Registration.groupNotCreate);
    }

    if (defaultCat) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(defaultCategories);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

      const categories = await this.categoryService.createDefaultCategories(
        accountId,
        group.id,
        defaultCategories
      );

      if (!categories) {
        this.logger.error(`chatId: ${chatId}, message: categories not create`);
        throw Error(messageForScenes.Registration.groupNotCreate);
      }
    }
    // if (categoriesNames && categoriesNames.length > 0) {
    //   for (const categoryName of categoriesNames) {
    //     const categoryPayload: ICategoryInput = {
    //       accountId,
    //       name: categoryName,
    //       groupId: group.id,
    //       status: true,
    //     };

    //     await this.categoryService.createCategory(categoryPayload);
    //   }
    // } //TODO bot

    return group;
  }

  /**
   * Получить данные пользователя в телеграмме
   * @param chatId ID чата пользователя
   * @returns
   */
  async getUser(chatId: string | number) {
    const resultUser = await this.gramService.getFullUser(chatId);
    if (!resultUser?.length) {
      // TODO Если не найден, то запросить данные у пользователя
      this.logger.error(`chatId: ${chatId}, message: not found tUser`);
      throw Error(messageForScenes.Registration.userNotFound);
    }
    const [fullUser] = resultUser as any;

    return fullUser;
  }
}
