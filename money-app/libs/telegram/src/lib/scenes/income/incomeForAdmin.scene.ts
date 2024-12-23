import { Injectable, Logger } from '@nestjs/common';
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
import { TelegramService } from '../../telegram.service';
import { scenes } from '../../scenesNames';
import { Telegraf } from 'telegraf';
import { UserService } from '@money-app/user';
import { CategoryService } from '@money-app/category';
import { RabbitService } from '@money-app/rabbit';
import { messageForScenes } from '../../message.patterns';
import { replyMarkups } from './income.store';
import { RedisService } from '@money-app/redis';
import {
  CategoryHashData,
  TransactionPayload,
  normalizeSumma,
} from '@money-app/shared';
import { Transaction } from '@money-app/clickhouse-client';
import { GroupService } from '@money-app/group';
import { AppLoggerLokiService } from '@money-app/logger-loki';

@Injectable()
@Scene(scenes.incomeAdmin)
export class IncomeForAdminScene {
  private logger = new Logger(IncomeForAdminScene.name);

  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly telegramService: TelegramService,
    private readonly rabbitService: RabbitService,
    private readonly groupService: GroupService,
    private readonly appLoggerLokiService: AppLoggerLokiService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.chat.id;
    this.appLoggerLokiService.log(
      `${ctx.chat.id} зашел на сцену ${scenes.expenseAdmin} `,
      'bot'
    );
    const user = await this.userService.getByChatId(chatId);
    if (user && user.role !== 'admin') {
      await ctx.scene.enter(scenes.income);
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
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroups,
        replyMarkups.IncomeSceneMenu
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

  @Action(/addIncome:.+/)
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

    if (categoryId === undefined) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorNotSelectCategoryText,
        null
      );
      await ctx.scene.reenter();
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
      await ctx.scene.enter(scenes.main);
      return;
    }

    const clientId = userClient.id;
    const groupId = userGroup.id;
    const userId = user.id;
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене ${scenes.expenseAdmin} добавляет покупку в категорию ${categoryId} на сумму ${summaNormal}`,
      'bot'
    );
    const transactionPayload: TransactionPayload = {
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
      Value: summaNormal,
      EventDate: new Date(),
      Operation: 'income',
    };
    console.log(transactionPayload);

    const addSumm = await this.rabbitService.addTransaction(transactionPayload);

    if (!addSumm.success) {
      this.appLoggerLokiService.error(
        `${ctx.chat.id} на сцене ${scenes.expenseAdmin} не смог добавить покупку в категорию ${categoryId} на сумму ${summaNormal}`,
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

    await this.telegramService.reply(
      ctx,
      messageForScenes.incomeScene.addIncomeMessage(
        categoryName,
        summaNormal.toString()
      ),
      replyMarkups.cancelIncome
    );
    // await this.telegramService.replyToAdmin(
    //   ctx,
    //   messageForScenes.incomeScene.addIncomeMessageAdmin(
    //     user.firstName,
    //     categoryName,
    //     summa,
    //     userGroup.name
    //   ),
    //   null
    // );
    state['categoryId'] = undefined;
    state['categoryName'] = undefined;
  }

  private async handleCategorySelection(
    userClientId: string,
    groupId: string,
    ctx: any
  ) {
    const categories =
      await this.categoryService.findAllIncomeByClientIdAndGroupId(
        userClientId,
        groupId
      );

    if (categories.length === 0) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotCategory,
        null
      );

      setTimeout(() => {
        ctx.scene.reenter();
      }, 2000);
      return;
    }
    const keyboardForCategory: any[] = [];

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
              callback_data: `addIncome:${cachedCategory.categoryId}`,
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
              callback_data: `addIncome:${newCategory}`,
            },
          ]);
        }
      }
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.selectCategory,
      replyMarkups.categoryMenu(keyboardForCategory)
    );
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    // ctx.answerCbQuery();
    // this.logger.debug(`${ctx.chat.id} scene leave`);
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.expenseAdmin} уходит с неё`,
      'bot'
    );
    await this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
