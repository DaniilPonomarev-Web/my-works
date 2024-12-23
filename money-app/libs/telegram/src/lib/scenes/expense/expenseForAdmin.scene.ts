import { Injectable } from '@nestjs/common';
import {
  Action,
  Context,
  Ctx,
  InjectBot,
  On,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { RedisService } from '@money-app/redis';
import { UserService } from '@money-app/user';
import { CategoryService } from '@money-app/category';
import {
  CategoryHashData,
  ICategoryInput,
  normalizeSumma,
} from '@money-app/shared';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { RabbitService } from '@money-app/rabbit';
import { Transaction } from '@money-app/clickhouse-client';
import { TelegramService } from '../../telegram.service';
import { replyMarkups } from './expence.store';
import { GroupService } from '@money-app/group';
import { Variables } from '../../variables';
import { selectCategoryTypes } from '../setupClientScene/group/store';
import { TransactionType } from '@money-app/entities';
import { AppLoggerLokiService } from '@money-app/logger-loki';

@Injectable()
@Scene(scenes.expenseAdmin)
export class expenseForAdminScene {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly telegramService: TelegramService,
    private readonly groupService: GroupService,
    private readonly rabbitService: RabbitService,
    private readonly appLoggerLokiService: AppLoggerLokiService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    this.appLoggerLokiService.log(
      chatId + ' зашел на сцену добавления затрат',
      'bot'
    );

    const user = await this.userService.getByChatId(chatId);
    if (user && user.role !== 'admin') {
      await ctx.scene.enter(scenes.expense);
      return;
    }
    if (!user) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserMessage,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }

    const accountId = user.accountId;
    const groups = await this.groupService.findAllEnabledByAccountId(accountId);
    if (!groups || groups.length <= 0) {
      this.appLoggerLokiService.error(
        `${chatId} на сцене  ${scenes.expenseAdmin} нет группы`,
        'bot'
      );

      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroups,
        replyMarkups.expenseSceneMenu
      );
      const groupsDisabled = await this.groupService.findAllDisabledByAccountId(
        accountId
      );
      if (groupsDisabled && groupsDisabled.length > 0) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.expenseScene.errorMessageDisabledGroupsAdmin(
            groupsDisabled.length
          ),
          replyMarkups.allGroupsDisabledMenuAdmin
        );
      }
      return;
    }

    if (groups.length === 1) {
      ctx.scene.state['groupId'] = groups[0].id;
      const selectedGroupId = ctx.scene.state['groupId'];
      const userClient = await this.userService.getAccountByChatId(chatId);
      if (!userClient) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.all.errorMessageNotClient,
          null
        );
        await ctx.scene.enter(scenes.main);
        return;
      }
      await this.handleCategorySelection(userClient.id, selectedGroupId, ctx);
      return;
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.selectGroup,
      replyMarkups.selectGroup(groups)
    );

    const userGroup = await this.userService.getGroupsByChatId(chatId);
    if (!userGroup) {
      this.appLoggerLokiService.error(
        `${chatId} на сцене  ${scenes.expenseAdmin} нет группы`,
        'bot'
      );

      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroup,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }
    const userClient = await this.userService.getAccountByChatId(chatId);
    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }
  }

  @Action(/selGroup:(.+)/)
  async selectGroupHandle(@Context() ctx: any) {
    const selectedGroupId = ctx.match[1];
    ctx.scene.state['groupId'] = selectedGroupId;
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);
    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }
    await this.handleCategorySelection(userClient.id, selectedGroupId, ctx);

    return;
  }

  @Action(/addExpense:.+/)
  async canceledEvent(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const categoryHashData: CategoryHashData =
      await this.redisService.getCategoryButton(cbQuery['data'].split(':')[1]);
    const state = ctx.scene.state;
    state['categoryId'] = categoryHashData.categoryId;
    state['categoryName'] = categoryHashData.categoryName;
    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.summ,
      null
    );
  }

  @On('text')
  async onAnswerText(@Ctx() ctx: any & { update: any }) {
    const chatId = ctx.chat.id;
    const state = ctx.scene.state;
    const categoryId = state['categoryId'];
    const categoryName = state['categoryName'];

    if (state['addNewCategory']) {
      const groupId = state['groupId'];
      const user = await this.userService.getByChatId(chatId);
      if (!user) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.all.noUserMessage,
          null
        );
        await ctx.scene.enter(scenes.main);
        return;
      }
      const categoryName = ctx.update.message.text;

      if (
        categoryName.length < Variables.group.minNameLenght ||
        categoryName.length > Variables.group.maxNameLenght
      ) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editCategoryScene.errorLenght,
          null
        );
        return;
      }
      const summaMessageId = ctx.update.message.message_id;
      this.telegramService.rememberMessage(ctx, summaMessageId);
      state['newNameCategory'] = categoryName;
      const categoryCreate: ICategoryInput = {
        accountId: user.accountId,
        name: state['newNameCategory'],
        type: TransactionType.Expense,
        groupId: groupId,
        status: true,
      };

      const addCategory = await this.categoryService.createCategory(
        categoryCreate
      );

      if (!addCategory) {
        this.appLoggerLokiService.error(
          `${chatId} на сцене  ${scenes.expenseAdmin} не смог добавить категорию`,
          'bot'
        );

        await this.telegramService.reply(
          ctx,
          messageForScenes.editGroupScene.notCreateCategory,
          null
        );
      }
      await this.telegramService.reply(
        ctx,
        messageForScenes.editGroupScene.SuccessCreateCategory(
          state['newNameCategory']
        ),
        null
      );
      state['addNewCategory'] = false;
      await ctx.scene.enter(scenes.expenseAdmin);

      return;
    }

    if (categoryId === undefined) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorNotSelectCategoryText,
        null
      );
      return;
    }
    const summa = ctx.update.message.text;
    const summaMessageId = ctx.update.message.message_id;
    this.telegramService.rememberMessage(ctx, summaMessageId);
    const summaNormal = normalizeSumma(summa);
    if (!summaNormal) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorSummText,
        null
      );
      return;
    }

    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotUser,
        null
      );
      return await ctx.scene.enter(scenes.main);
    }
    const userGroup = await this.userService.getGroupsByChatId(chatId);
    if (!userGroup) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroup,
        null
      );
      return await ctx.scene.enter(scenes.main);
    }
    const userClient = await this.userService.getAccountByChatId(chatId);
    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      return await ctx.scene.enter(scenes.main);
    }

    const clientId = userClient.id;
    const groupId = userGroup.id;
    const userId = user.id;

    this.appLoggerLokiService.log(
      `${chatId} на сцене  ${
        scenes.expenseAdmin
      } добавляет покупку в категорию ${categoryId} на сумму ${
        summaNormal * -1
      }`,
      'bot'
    );
    const addSumm = await this.rabbitService.addTransaction({
      AccountID: clientId,
      UserID: userId,
      FirstName: user.firstName,
      ChatID: chatId,
      GroupID: groupId,
      GroupName: userGroup.name,
      CurrencyID: '00000000-0000-0000-0000-000000000000',
      CurrencyName: 'RUB',
      CategoryID: categoryId,
      CategoryName: categoryName,
      Value: summaNormal * -1,
      EventDate: new Date(),
      Operation: 'expense',
    });

    if (!addSumm.success) {
      this.appLoggerLokiService.error(
        `${chatId} на сцене  ${scenes.expenseAdmin} не смог добавить покупку`,
        'bot'
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageAddExpense,
        null
      );
      return;
    }

    await ctx.deleteMessage(ctx.update.message.id, chatId);

    const category = await this.categoryService.findOne(categoryId);
    if (category?.limit) {
      let good = true;
      let textLimit = '';

      const allBuyInCategoryOnMonth =
        await this.rabbitService.getFinancesByMonthByCategory(
          clientId,
          'expense',
          categoryId
        );

      const summa = parseFloat(allBuyInCategoryOnMonth.summa);
      const positiveSumma = Math.abs(summa);

      const percentSpent = (positiveSumma / category.limit) * 100;

      if (percentSpent < 50) {
        textLimit = 'Можно ещё тратить';
      }
      if (percentSpent >= 50 && percentSpent < 70) {
        textLimit = 'Можно тратить, но стоит задуматься';
      }
      if (percentSpent >= 70 && percentSpent < 90) {
        textLimit = 'Почти на исходе! Рассмотрите свои расходы';
      }
      if (percentSpent >= 90) {
        textLimit =
          'Срочно прекратите тратить! Или сделайте себе подарок и прокрутите лимит 😅';
        good = false;
      }
      if (percentSpent > 100) {
        textLimit =
          'Лимит превышен! Необходимо прекратить траты или пересмотреть бюджет 😑';
        good = false;
      }

      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.addExpenseMessageWithLimit(
          categoryName,
          summaNormal.toString(),
          category.limit,
          positiveSumma,
          good,
          textLimit
        ),
        replyMarkups.cancelExpense
      );
    }
    if (!category?.limit) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.addExpenseMessage(categoryName, summa),
        replyMarkups.cancelExpense
      );
    }

    state['categoryId'] = undefined;
    state['categoryName'] = undefined;
  }

  private async handleCategorySelection(
    userClientId: string,
    groupId: string,
    ctx: any
  ) {
    const categories =
      await this.categoryService.findAllExpenseByClientIdAndGroupId(
        userClientId,
        groupId
      );

    if (categories.length === 0) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotCategory,
        null
      );

      return await ctx.scene.enter(scenes.main);
    }
    const keyboardForCategory: Array<
      Array<{ text: string; callback_data: string }>
    > = [];

    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      if (category.status) {
        const cachedCategory = await this.redisService.getCategoryButton(
          category.id
        );
        if (cachedCategory) {
          keyboardForCategory.push([
            {
              text: category.name,
              callback_data: `addExpense:${cachedCategory.categoryId}`,
            },
          ]);
        }
        if (!cachedCategory) {
          const newCategory = await this.redisService.setCategoryButton(
            category.id,
            category.name
          );

          keyboardForCategory.push([
            {
              text: category.name,
              callback_data: `addExpense:${newCategory}`,
            },
          ]);
        }
      }
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.selectCategory,
      replyMarkups.categoryMenuExpenceAdmin(keyboardForCategory)
    );
  }

  @Action(/addCategory/)
  async addNewCategory(@Ctx() ctx: any) {
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.expenseAdmin} хочет добавить категорию`,
      'bot'
    );
    const state = ctx.scene.state;
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.addCategory,
      null
    );
    state['addNewCategory'] = true;
  }

  @Action(/goMainScene/)
  async onLeave(@Ctx() ctx: any) {
    // await ctx.answerCbQuery();
    await ctx.scene.enter(scenes.main);
  }
  @SceneLeave()
  async onLeaveTelegram(@Ctx() ctx: any) {
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.expenseAdmin} уходит с неё`,
      'bot'
    );
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
