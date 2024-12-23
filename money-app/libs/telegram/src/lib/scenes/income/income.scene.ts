import { Injectable, Logger } from '@nestjs/common';
import {
  Action,
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

@Injectable()
@Scene(scenes.income)
export class IncomeScene {
  private logger = new Logger(IncomeScene.name);

  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly telegramService: TelegramService,
    private readonly rabbitService: RabbitService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.chat.id;
    const user = await this.userService.getByChatId(chatId);
    if (user && user.role === 'admin') {
      await ctx.scene.enter(scenes.incomeAdmin);
      return;
    }

    const userGroup = await this.userService.getGroupsByChatId(chatId);

    if (!userGroup) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroup,
        replyMarkups.IncomeSceneMenu
      );
      return;
    }
    if (userGroup.status === false) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageDisabledGroupsUser(
          userGroup.name
        ),
        replyMarkups.allGroupsDisabledMenuUser(userGroup.id)
      );
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
    const clientId = userClient.id;
    const groupId = userGroup.id;

    await this.handleCategorySelection(clientId, groupId, ctx);
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

    const addSumm = await this.rabbitService.addTransaction(transactionPayload);

    if (!addSumm.success) {
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
      messageForScenes.incomeScene.addIncomeMessage(categoryName, summa),
      replyMarkups.cancelIncome
    );
    await this.telegramService.replyToAdmin(
      ctx,
      messageForScenes.incomeScene.addIncomeMessageAdmin(
        user.firstName,
        categoryName,
        summaNormal.toString(),
        userGroup.name
      ),
      null
    );
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
        ctx.scene.enter(scenes.main);
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

    await this.telegramService.reply(
      ctx,
      messageForScenes.all.goHome,
      replyMarkups.IncomeSceneMenu
    );
  }

  @Action(/enableGroupReq:.+/)
  async enableGroup(@Ctx() ctx: any & { update: any }) {
    const chatId = ctx.chat.id;
    const cbQuery = ctx.update.callback_query;
    const groupID: string = cbQuery['data'].split(':')[1];
    const userGroup = await this.userService.getGroupsByChatId(chatId);
    const user = await this.userService.getByChatId(chatId);

    if (userGroup && user) {
      await this.telegramService.replyToAdmin(
        ctx,
        messageForScenes.expenseScene.messageForEnableGroup(
          user.firstName,
          userGroup.name
        ),
        replyMarkups.enableGroupForAdmin(groupID)
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.helpEnableGoup,
        null
      );
      return;
    }
    await this.telegramService.replyToAdmin(
      ctx,
      messageForScenes.expenseScene.messageForEnableGroupNotData,
      null
    );
    await this.telegramService.replyToAdmin(
      ctx,
      messageForScenes.expenseScene.helpEnableGoup,
      null
    );
    return;
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.logger.debug(`${ctx.chat.id} scene leave`);
    await this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
