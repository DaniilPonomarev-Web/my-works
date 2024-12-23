import { Injectable, Logger } from '@nestjs/common';
import {
  Ctx,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
  Action,
  On,
} from 'nestjs-telegraf';
import { UserService } from '@money-app/user';
import { scenes } from '../../../scenesNames';
import { messageForScenes } from '../../../message.patterns';
import { TelegramService } from '../../../telegram.service';
import { SceneContext } from 'telegraf/typings/scenes';
import { Update as UpdateCtx } from 'telegraf/typings/core/types/typegram';
import { AccountService } from '@money-app/account';

@Injectable()
@Scene(scenes.edit.alarms)
export class EditAlarmsScene {
  private logger = new Logger(EditAlarmsScene.name);
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private readonly telegramService: TelegramService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);

    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient
      );
      return await ctx.scene.enter(scenes.main);
    }

    const userSettings = userClient.setting;
    const settingsObject = JSON.parse(userSettings);
    const remindersInfoValue = settingsObject.remindersEnabled;

    console.log(remindersInfoValue);

    const keyboardForAlarms: Array<
      Array<{ text: string; callback_data: string }>
    > = [];

    keyboardForAlarms.push([
      {
        text:
          remindersInfoValue === 0
            ? 'Включить напоминание о внесении расходов и доходов'
            : 'Отключить напоминание о внесении расходов и доходов',
        callback_data: `EditRemindersInfo:${userClient.id}`,
      },
    ]);

    keyboardForAlarms.push([
      {
        text: messageForScenes.editGroupScene.goSettings,
        callback_data: 'goSetupClientScene',
      },
    ]);
    keyboardForAlarms.push([
      { text: 'Главная страница 🏠', callback_data: 'goMainScene' },
    ]);

    const menuCategories = {
      reply_markup: {
        inline_keyboard: keyboardForAlarms,
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    };

    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.selectGroup,
      menuCategories
    );
  }

  @Action(/EditRemindersInfo:.+/)
  async editRemindersInfo(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const accoundId = cbQuery['data'].split(':')[1];

    const OffRemindersInfo = await this.accountService.editRemindersInfo(
      accoundId
    );
    await ctx.scene.enter(scenes.edit.alarms);
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.logger.debug(`${ctx.chat.id} scene leave`);
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
