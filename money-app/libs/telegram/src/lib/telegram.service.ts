import { Injectable, Logger } from '@nestjs/common';
import { Telegraf } from 'telegraf';

import { InjectBot } from 'nestjs-telegraf';
import { UserService } from '@money-app/user';
import { scenes } from './scenesNames';
import { InvitedsService } from '@money-app/inviteds';
import { messageForScenes } from './message.patterns';
import { AccountService } from '@money-app/account';
import { GroupService } from '@money-app/group';
import { CategoryService } from '@money-app/category';
import { RabbitService } from '@money-app/rabbit';

type ActionType =
  | 'registration-by-invitation'
  | 'authorization'
  | 'registration';
@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly accountService: AccountService,
    private readonly categoryService: CategoryService,
    private readonly invitedsService: InvitedsService,
    private readonly rabbitService: RabbitService
  ) {}

  async setMockDataPayments(chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    const userGroup = await this.userService.getGroupsByChatId(
      chatId.toString()
    );
    const userClient = await this.userService.getAccountByChatId(
      chatId.toString()
    );
    const clientId = userClient.id;
    const groupId = userGroup.id;
    const userId = user.id;

    const categoriesExpence =
      await this.categoryService.findAllExpenseByClientIdAndGroupId(
        clientId,
        groupId
      );

    const categoriesIncome =
      await this.categoryService.findAllIncomeByClientIdAndGroupId(
        clientId,
        groupId
      );

    const transactionsCount = 5;
    const getRandomDateInMonth = (year: number, month: number): Date => {
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const randomHour = Math.floor(Math.random() * 24);
      const randomMinute = Math.floor(Math.random() * 60);
      const randomSecond = Math.floor(Math.random() * 60);

      const dateFinally = new Date(
        year,
        month,
        randomDay,
        randomHour,
        randomMinute,
        randomSecond
      );
      return dateFinally;
    };

    const currentDate = new Date(); // Добавлено: текущая дата

    for (let i = 0; i < transactionsCount; i++) {
      const categoryIncomeRandom =
        categoriesExpence[Math.floor(Math.random() * categoriesIncome.length)];
      const categoryExpenceRandom =
        categoriesExpence[Math.floor(Math.random() * categoriesExpence.length)];
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const expenseDate = getRandomDateInMonth(currentYear, currentMonth);
      const incomeDate = getRandomDateInMonth(currentYear, currentMonth);
      console.log(incomeDate);
      console.log(expenseDate);

      const addExpense = await this.rabbitService.addTransaction({
        AccountID: clientId,
        UserID: userId,
        FirstName: user.firstName,
        ChatID: chatId,
        GroupID: groupId,
        GroupName: userGroup.name,
        CurrencyID: '00000000-0000-0000-0000-000000000000',
        CurrencyName: 'RUB',
        CategoryID: categoryExpenceRandom.id,
        CategoryName: categoryExpenceRandom.name,
        Value: (Math.floor(Math.random() * 10000) + 1) * -1,
        EventDate: expenseDate,
        Operation: 'expense',
      });

      const addIncome = await this.rabbitService.addTransaction({
        AccountID: clientId,
        UserID: userId,
        FirstName: user.firstName,
        ChatID: chatId,
        GroupID: groupId,
        GroupName: userGroup.name,
        CurrencyID: '00000000-0000-0000-0000-000000000000',
        CurrencyName: 'RUB',
        CategoryID: categoryIncomeRandom.id,
        CategoryName: categoryIncomeRandom.name,
        Value: Math.floor(Math.random() * 10000) + 1,
        EventDate: incomeDate,
        Operation: 'income',
      });
    }
  }

  /**
   * Определяем действия на главной странице
   * @param ctx Контект
   * @returns
   */
  async determineStart(ctx: any): Promise<ActionType> {
    if (ctx.startPayload) return 'registration-by-invitation';

    const user = await this.userService.getByChatId(ctx.message.chat.id);
    if (user) return 'authorization';

    return 'registration';
  }

  /**
   * Выполнить действия при старте
   * @param action Тип дейтсвия
   * @returns
   */
  async actionsAtStart(action: ActionType, ctx: any) {
    const actions = {
      'registration-by-invitation': async () => {
        try {
          this.logger.debug(
            'Пользователь зашел по приглашению action => registration-by-invitation'
          );
          const invite = await this.invitedsService.gerByHash(ctx.startPayload);
          if (!invite) {
            throw Error(`Not found invite by ${ctx.startPayload}`);
          }

          if (new Date(invite.validity) <= new Date()) {
            throw Error(`Not invite valid invite by ${ctx.startPayload}`);
          }

          await ctx.scene.enter(scenes.reg, { invite });
        } catch (error) {
          this.logger.error(error);
          await ctx.reply(messageForScenes.Main.errorInvate);
        }
      },
      authorization: async () => {
        this.logger.debug(
          'Пользователь найден в базе, action => authorization'
        );
        await ctx.scene.enter(scenes.main);
      },
      registration: async () => {
        this.logger.debug('Пользователь не найден, action => registration');
        await ctx.scene.enter(scenes.reg);
      },
    };

    return await actions[action]();
  }

  /**
   * Отправить сообщение
   * @param chatId Id пользователя телеграмм
   * @param message Тест сообщения
   * @returns
   */
  sendMessage(chatId: string, message: string) {
    this.logger.log(`sendMessage -> chatId: ${chatId}`);
    return this.bot.telegram.sendMessage(chatId, message);
  }

  async deleteMessages(chatId: string, messages: number[]) {
    if (!messages?.length) return;
    for (const message of messages) {
      await this.delay(500);
      await this.deleteMessage(chatId, message);
      // this.deleteMessage(chatId, m);
    }
  }

  /**
   * Отправить сообщение пользователю в сцене
   * @param ctx Контект
   * @param text Текст сообщения
   * @param extra Доп данные
   */
  async reply(ctx: any, text: string, extra: any | null = null) {
    try {
      const messages = this.initMessageStore(ctx);

      if (extra) {
        const { message_id } = await ctx.replyWithHTML(text, extra);
        messages.push(message_id);
        return message_id;
      }

      const { message_id } = await ctx.replyWithHTML(text);
      messages.push(message_id);

      return message_id;
    } catch (error) {
      this.logger.error(error);
      throw Error(messageForScenes.Main.errorReply);
    }
  }

  /**
   * Отправить изображение пользователю
   * @param ctx Контект
   * @param text Текст сообщения
   * @param photoUrl Урл изображения
   */
  async replyImage(ctx: any, photoUrl: string, text: string) {
    try {
      const messages = this.initMessageStore(ctx);

      const { message_id } = await ctx.telegram.sendPhoto(
        ctx.chat.id,
        photoUrl,
        {
          caption: text,
        }
      );

      messages.push(message_id);

      return message_id;
    } catch (error) {
      this.logger.error(error);
      throw Error(messageForScenes.Main.errorReply);
    }
  }

  /**
   * Отправить сообщение администратору бота
   * @param ctx Контекст
   * @param adminChatId ID чата администратора
   * @param text Текст сообщения
   * @param extra Дополнительные данные
   */

  async replyToAdmin(ctx: any, text: string, extra: any | null = null) {
    try {
      const messages = this.initMessageStore(ctx);
      const user = await this.userService.getByChatId(ctx.chat.id);
      if (!user) {
        return;
      }

      const admins = await this.userService.getUsersByAccount(
        user.accountId,
        'admin'
      );
      if (!admins) {
        return;
      }
      const extraOptions = {
        parse_mode: 'HTML',
      };
      if (extra) {
        for (const admin of admins) {
          const { message_id } = await ctx.telegram.sendMessage(
            admin.chatId,
            text,
            { ...extra, ...extraOptions }
          );
          this.logger.log(
            `Сообщение отправлено администратору  ${admin.firstName} ${admin.lastName} !~`
          );
          messages.push(message_id);
        }
        return messages;
      }

      for (const admin of admins) {
        const { message_id } = await ctx.telegram.sendMessage(
          admin.chatId,
          text,
          extra
        );
        this.logger.log(
          `Сообщение отправлено администратору ${admin.firstName} ${admin.lastName}`
        );
        messages.push(message_id);
      }
      return messages;
    } catch (error) {
      this.logger.error(error);
      throw Error(messageForScenes.Main.errorReply);
    }
  }

  async replyToAllUsersByAccountForGroup(
    ctx: any,
    anyParamentr: string | null = null,
    text: string,
    extra: any | null = null
  ) {
    try {
      const messages = this.initMessageStore(ctx);
      const chatId = ctx.chat.id;
      const accountId = await this.accountService.getAccountId(chatId);
      if (!accountId) {
        return null;
      }
      if (anyParamentr) {
        const groupId = anyParamentr;
        const users = await this.userService.getUsersByAccountAndGroupId(
          accountId,
          groupId
        );

        const extraText = {
          parse_mode: 'HTML',
        };
        if (users) {
          for (const user of users) {
            const { message_id } = await ctx.telegram.sendMessage(
              user.chatId,
              text, // предполагается, что text - это строка с HTML-разметкой
              extraText
            );
            this.logger.log(
              `Сообщение отправлено пользователю бота ${user.firstName} ${user.lastName}`
            );
            messages.push(message_id);
          }
          return messages;
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw Error(messageForScenes.Main.errorReply);
    }
  }

  /**
   * Сохранить сообщения пользователя
   * @param ctx Контекст
   * @param id Id сообщения
   * @returns
   */
  async rememberMessage(ctx: any, id: number) {
    if (!id) return false;
    try {
      this.initMessageStore(ctx).push(id);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  /**
   * Очистить хранилище сообщений
   * @param ctx Контекст
   * @param chatId ID пользователя телеграмм
   * @returns
   */
  async clearMessageStorage(ctx: any, chatId: string) {
    if (!ctx.scene.state.messages?.length) return;
    if (!chatId) return;

    // TODO Отправлять запросы удаления пачками || UPDATE 14.11.23 В ТЕЛЕГЕ НЕТ УДАЛЕНИЯ ВСЕХ, ТОЛЬКО ОЧЕРЕДНО ДЕЛАЕМ
    this.deleteMessages(ctx.chat.id, ctx.scene.state.messages);

    return;
  }

  /**
   * Инициализировать хранилище сообщений пользователя
   * @param ctx Контекст
   * @returns
   */
  private initMessageStore(ctx: any): number[] {
    if (!ctx.scene.state.messages) {
      ctx.scene.state.messages = [];
    }

    return ctx.scene.state.messages;
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Удалить сообщения
   * @param chatId ID
   * @param messageId ID сообщения
   * @returns
   */
  private async deleteMessage(chatId: string, messageId: number) {
    try {
      const result = await this.bot.telegram.deleteMessage(chatId, messageId);
      return result;
    } catch (error) {
      // console.log(error);

      // this.logger.error(`Delete message error ${chatId}`);
      return false;
    }
  }

  async enableGroup(groupId: string) {
    const group = await this.groupService.findOne(groupId);
    if (!group) {
      return null;
    }
    if (group.status === false) {
      const enableGroup = await this.groupService.updateGroupStatus(groupId);
      return enableGroup;
    }
    return null;
  }

  /**
   * Отправить сообщение
   * @param chatId Id пользователя телеграмм
   * @param message Тест сообщения
   * @returns
   */
  async sendMessageUsers(chatId: string, message: string, keyboard?: any) {
    this.logger.debug(`sendMessage -> chatId: ${chatId}`);
    const options = keyboard
      ? { reply_markup: { inline_keyboard: keyboard } }
      : {};
    return this.bot.telegram.sendMessage(chatId, message, options);
  }
}
