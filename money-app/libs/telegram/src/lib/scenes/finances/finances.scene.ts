import { Injectable, Logger } from '@nestjs/common';
import {
  Action,
  Ctx,
  InjectBot,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { UserService } from '@money-app/user';
import { DashboardReport } from '@money-app/shared';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { RabbitService } from '@money-app/rabbit';
import { Update as UpdateCtx } from 'telegraf/typings/core/types/typegram';
import { TelegramService } from '../../telegram.service';
import { replyMarkups } from './finances.store';
import { SceneContext } from 'telegraf/typings/scenes';
import { AppLoggerLokiService } from '@money-app/logger-loki';

@Injectable()
@Scene(scenes.finances.main)
export class MyFinancesScene {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
    private readonly rabbitService: RabbitService,
    private readonly appLoggerLokiService: AppLoggerLokiService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.finances.main} зашел`,
      'bot'
    );
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      // TODO проверить условие
      await ctx.scene.leave();
      return;
    }

    let dataDashBoard: DashboardReport = {
      expenses: {
        day: 0,
        week: 0,
        month: 0,
        year: 0,
      },
      income: {
        day: 0,
        week: 0,
        month: 0,
        year: 0,
      },
    };
    if (user.role === 'admin') {
      dataDashBoard = await this.rabbitService.getDashboardAdmin(
        user.accountId
      );
    }
    if (user.role === 'user') {
      dataDashBoard = await this.rabbitService.getDashboardUser(user.chatId);
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.Main.userInfoBarMessage(dataDashBoard),
      replyMarkups.myFinances
    );
  }

  @Action(/goMyIncomes/)
  async goMyFinances(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.appLoggerLokiService.log(
      `${chatId} на сцене  ${scenes.finances.main} переходит на сцену ${scenes.finances.income}`,
      'bot'
    );
    await ctx.scene.enter(scenes.finances.income);
  }

  @Action(/goMyExpenses/)
  async goMyExpenses(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.appLoggerLokiService.log(
      `${chatId} на сцене  ${scenes.finances.main} переходит на сцену ${scenes.finances.expense}`,
      'bot'
    );
    await ctx.scene.enter(scenes.finances.expense);
  }

  @SceneLeave()
  async onLeaveTelegram(@Ctx() ctx: any) {
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.finances.main} уходит с нее`,
      'bot'
    );
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
