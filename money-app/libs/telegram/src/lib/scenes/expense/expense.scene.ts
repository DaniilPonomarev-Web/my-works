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
import { CategoryHashData, normalizeSumma } from '@money-app/shared';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { RabbitService } from '@money-app/rabbit';
import { Transaction } from '@money-app/clickhouse-client';
import { TelegramService } from '../../telegram.service';
import { replyMarkups } from './expence.store';

@Injectable()
@Scene(scenes.expense)
export class expenseScene {
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
      await ctx.scene.enter(scenes.expenseAdmin);
      return;
    }

    const userGroup = await this.userService.getGroupsByChatId(chatId);

    if (!userGroup) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroup,
        replyMarkups.expenseSceneMenu
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
    await this.telegramService.rememberMessage(ctx, summaMessageId);
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
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageAddExpense,
        null
      );

      return;
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.addExpenseMessage(
        categoryName,
        summaNormal.toString()
      ),
      replyMarkups.cancelExpense
    );
    await this.telegramService.replyToAdmin(
      ctx,
      messageForScenes.expenseScene.addExpenseMessageAdmin(
        user.firstName,
        categoryName,
        summaNormal.toString(),
        userGroup.name
      ),
      null
    );
    await ctx.deleteMessage(ctx.update.message.id, chatId);

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
      setTimeout(() => {
        ctx.scene.enter(scenes.main);
      }, 2000);
      return;
    }
    // const keyboardForCategory: Array<
    //   Array<{ text: string; callback_data: string }>
    // > = [];
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
      replyMarkups.categoryMenuExpence(keyboardForCategory)
    );

    await this.telegramService.reply(
      ctx,
      messageForScenes.all.goHome,
      replyMarkups.expenseSceneMenu
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
  async onLeaveTelegram(@Ctx() ctx: any) {
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
