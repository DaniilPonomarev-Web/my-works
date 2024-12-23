import { Injectable, Logger } from '@nestjs/common';
import {
  Action,
  Ctx,
  InjectBot,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
  Context,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { RedisService } from '@money-app/redis';
import { UserService } from '@money-app/user';
import { CategoryService } from '@money-app/category';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { RabbitService } from '@money-app/rabbit';
import { TelegramService } from '../../telegram.service';
import { Period, periodDescriptions, replyMarkups } from './finances.store';
import { Update as UpdateCtx } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { DashboardReport, ExpenseDataWithCategory } from '@money-app/shared';
import { GroupService } from '@money-app/group';

@Injectable()
@Scene(scenes.finances.expense)
export class MyFinancesExpenseScene {
  private logger = new Logger(MyFinancesExpenseScene.name);
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly categoryService: CategoryService,
    private readonly telegramService: TelegramService,
    private readonly rabbitService: RabbitService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    ctx.scene.state['groupIdExpense'] = null;
    const chatId = ctx.chat.id;
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
    const groups = await this.groupService.findAllByAccountId(user.accountId);

    if (!groups || groups.length <= 1) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.finances.keyboard,
        replyMarkups.selectPeriodFinancesMenu
      );
      return;
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.selectGroup,
      replyMarkups.selectGroup(groups)
    );
    ctx.answerCbQuery();
    return;
  }

  @Action(/selGroup:(.+)/)
  async selectGroupHandle(@Context() ctx: any) {
    const selectedGroupId = ctx.match[1];
    ctx.scene.state['groupIdExpense'] = selectedGroupId;
    await this.telegramService.reply(
      ctx,
      messageForScenes.finances.keyboard,
      replyMarkups.selectPeriodFinancesMenu
    );
    ctx.answerCbQuery();
    return;
  }

  @Action(/getFinances:.+/)
  async getFinances(@Ctx() ctx: any & { update: any }) {
    const state = ctx.scene.state;
    const groupId = state['groupIdExpense'];

    const cbQuery = ctx.update.callback_query;
    const period: Period = cbQuery['data'].split(':')[1];
    const chatId = ctx.update.callback_query.from.id;
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotUser,
        null
      );
      await ctx.scene.enter(scenes.main);
      ctx.answerCbQuery();
      return;
    }

    let getExpencesByPeriod: ExpenseDataWithCategory[];
    // Выбираем функцию в зависимости от переданного периода
    switch (period) {
      case 'Today':
        getExpencesByPeriod = await this.rabbitService.getFinancesByToday(
          user.accountId,
          'expense',
          groupId
        );
        break;
      case 'Month':
        getExpencesByPeriod = await this.rabbitService.getFinancesByMonth(
          user.accountId,
          'expense',
          groupId
        );
        break;
      case 'Week':
        getExpencesByPeriod = await this.rabbitService.getFinancesByWeek(
          user.accountId,
          'expense',
          groupId
        );
        break;
      case 'Year':
        getExpencesByPeriod = await this.rabbitService.getFinancesByYear(
          user.accountId,
          'expense',
          groupId
        );
        break;
      default:
        // По умолчанию, если неизвестный период
        getExpencesByPeriod = await this.rabbitService.getFinancesByMonth(
          user.accountId,
          'expense',
          groupId
        );
    }

    if (getExpencesByPeriod.length === 0) {
      let groupName = '';
      if (groupId) {
        const group = await this.groupService.findOne(groupId);
        groupName = `в группе "<b>${group?.name}</b>"`;
      }
      const message = `За <b>${periodDescriptions[period]}</b> ${groupName} вы ничего не потратили.`;
      await this.telegramService.reply(
        ctx,
        message,
        replyMarkups.selectPeriodFinancesMenu
      );
      ctx.answerCbQuery();
      return;
    }

    const categoryExpenses: Record<string, number> = {};

    for (const expenseData of getExpencesByPeriod) {
      const category = await this.categoryService.findOne(
        expenseData.CategoryID
      );

      if (category) {
        if (categoryExpenses[category.name]) {
          categoryExpenses[category.name] += Math.abs(expenseData.summa);
        } else {
          categoryExpenses[category.name] = Math.abs(expenseData.summa);
        }
      }
    }
    let groupName = '';
    if (groupId) {
      const group = await this.groupService.findOne(groupId);
      groupName = `в группе "<b>${group?.name}</b>"`;
    }
    let message = `За ${periodDescriptions[period]} ${groupName} Ваши расходы:\n`;

    for (const categoryName in categoryExpenses) {
      const totalExpense = categoryExpenses[categoryName];
      message += `${categoryName}: <b>${totalExpense}</b> ₽;\n`;
    }
    await this.telegramService.reply(
      ctx,
      message,
      replyMarkups.selectPeriodFinancesMenu
    );
    await ctx.answerCbQuery();
  }

  @Action(/goMyFinances/)
  async goMyFinances(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену "Мои финансы"`);
    await ctx.scene.enter(scenes.finances.main);
  }

  @SceneLeave()
  async onLeaveTelegram(@Ctx() ctx: any) {
    ctx.scene.state['groupIdExpense'] = null;
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
