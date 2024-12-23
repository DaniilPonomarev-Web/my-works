import { Start, Update, Ctx, Action } from 'nestjs-telegraf';
import type { SceneContext } from 'telegraf/typings/scenes';
import { TelegramService } from './telegram.service';

import { Logger } from '@nestjs/common';
import { Update as UpdateCtx } from 'telegraf/typings/core/types/typegram';
import { scenes } from './scenesNames';
import { messageForScenes } from './message.patterns';

@Update()
export class TelegramUpdate {
  private logger = new Logger(TelegramUpdate.name);
  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  async startCommand(
    @Ctx() ctx: SceneContext & { state: any; startPayload: string }
  ) {
    const action = await this.telegramService.determineStart(ctx);
    await this.telegramService.actionsAtStart(action, ctx);
    return;
  }

  @Action(/addIncome/)
  async addIncome(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(
      `${chatId} Переходит на сцену добавить доходы (incomeScene)`
    );
    await ctx.scene.enter(scenes.income);
    await ctx.answerCbQuery();
  }
  @Action(/addExpenseHand/)
  async addExpense(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(
      `${chatId} Переходит на сцену добавления затрат (addExpenseMenu)`
    );
    await ctx.scene.enter(scenes.expense);
    await ctx.answerCbQuery();
  }
  @Action(/addExpenseMenu/)
  async addExpenseMenu(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    // const getUserId = (context: Context): number => {
    //   if ('callback_query' in context.update) {
    //     console.log('1');
    //     return context.update.callback_query.from.id;
    //   }
    //   if ('message' in context.update) {
    //     console.log('2');
    //     return context.update.message.from.id;
    //   }
    //   if ('my_chat_member' in context.update) {
    //     console.log('3');
    //     return context.update.my_chat_member.from.id;
    //   }
    //   return -1;
    // };
    // const chatId = getUserId(ctx);
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(
      `${chatId} Переходит на сцену меню затраты (addExpenseMenu)`
    );
    await ctx.scene.enter(scenes.expenseMenu);
    await ctx.answerCbQuery();
  }
  @Action(/myGroup/)
  async myGroup(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену члены группы (myGroup)`);
    await ctx.scene.enter('GroupScene');
    await ctx.answerCbQuery();
  }
  @Action(/goSetupClientScene/)
  async goSetupClientScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    await ctx.scene.enter(scenes.edit.setup);
    await ctx.answerCbQuery();
  }

  @Action(/AddExpenseByQr/)
  async goExpenseQRScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    await ctx.scene.enter(scenes.expenseQr);
    await ctx.answerCbQuery();
  }

  @Action(/goMainScene/)
  async test(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену Главную сцену (mainScene)`);
    await ctx.scene.enter(scenes.main);
    await ctx.answerCbQuery();
  }

  @Action(/goInviteScene/)
  async goInviteScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек группы`);
    await ctx.scene.enter('inviteScene');
    await ctx.answerCbQuery();
  }

  @Action(/goInstructions/)
  async goInstructions(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    // this.logger.log(`${chatId} Переходит на сцену настроек группы`);
    await ctx.scene.enter(scenes.instructions);
    await ctx.answerCbQuery();
  }

  @Action(/goMyFinances/)
  async goMyFinances(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену "Мои финансы"`);
    await ctx.scene.enter(scenes.finances.main);
    await ctx.answerCbQuery();
  }

  @Action(/goSubscribeScene/)
  async goSubscribeScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену "Подписка"`);
    await ctx.scene.enter(scenes.subscribe);
    await ctx.answerCbQuery();
  }

  @Action(/mockExpenseIncome/)
  async SendMockExpenseIncome(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    await this.telegramService.setMockDataPayments(chatId);
    await ctx.answerCbQuery();
  }

  @Action(/enableGroup:.+/)
  async enableGroupById(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const chatId = ctx.chat.id;
    const groupId: string = cbQuery['data'].split(':')[1];
    const group = await this.telegramService.enableGroup(groupId);
    if (!group) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.enabledGroupFailed,
        null
      );
      return;
    }
    await this.telegramService.replyToAllUsersByAccountForGroup(
      ctx,
      groupId,
      messageForScenes.all.enabledGroupSuccessForUser(group.name),
      null
    );
    await ctx.answerCbQuery();
  }

  @Action(/SetupAlarmsScene/)
  async setupAlarmsScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек уведомлений`);
    await ctx.scene.enter(scenes.edit.alarms);
  }

  @Action(/subscribeInfoOffAccount/)
  async SubscribeInfoOffAccount(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    await this.telegramService.setMockDataPayments(chatId);
    await ctx.answerCbQuery();
  }
}
