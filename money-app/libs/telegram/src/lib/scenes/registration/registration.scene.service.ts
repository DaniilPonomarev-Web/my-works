import { AccountService } from '@money-app/account';
import { GramService } from '@money-app/gram';
import { GroupService } from '@money-app/group';
import { Injectable, Logger } from '@nestjs/common';
import { messageForScenes } from '../../message.patterns';
import { CategoryService } from '@money-app/category';
import { defaultCategories } from '@money-app/shared';

@Injectable()
export class RegistrationSceneService {
  private logger = new Logger(RegistrationSceneService.name);

  constructor(
    private readonly accountService: AccountService,
    private readonly groupService: GroupService,
    private readonly categoryService: CategoryService,
    private readonly gramService: GramService
  ) {}

  /**
   * Получить аккаунт пользователя
   * @param state Состояние сессии
   * @param chatId ID чата пользователя
   * @returns
   */
  async getAccount(state: any, chatId: number) {
    if (state?.invite?.accountId) return state.invite.accountId;

    const account = await this.accountService.create(chatId, 'Person');
    if (!account) {
      this.logger.error(`chatId: ${chatId}, message: account not create`);
      throw Error(messageForScenes.Registration.accountNotCreate);
    }

    return account.id;
  }
  async getAccountState(state: any, chatId: number) {
    if (state?.invite?.accountId) return state.invite.accountId;

    const account = await this.accountService.create(chatId, 'Person');
    if (!account) {
      this.logger.error(`chatId: ${chatId}, message: account not create`);
      throw Error(messageForScenes.Registration.accountNotCreate);
    }

    return account.id;
  }

  /**
   * Получить группу
   * @param state Состояние
   * @param chatId ID чата пользователя
   * @param accountId ID Аккаунта
   * @returns
   */
  async getGroup(state: any, chatId: number, accountId: string) {
    if (state?.invite?.groupId) return state.invite.groupId;

    const group = await this.groupService.create(accountId, 'Моя группа');

    if (!group) {
      this.logger.error(`chatId: ${chatId}, message: group not create`);
      throw Error(messageForScenes.Registration.groupNotCreate);
    }
    const categories = await this.categoryService.createDefaultCategories(
      accountId,
      group.id,
      defaultCategories
    );
    if (!categories) {
      this.logger.error(`chatId: ${chatId}, message: categories not create`);
      throw Error(messageForScenes.Registration.groupNotCreate);
    }
    return group.id;
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
