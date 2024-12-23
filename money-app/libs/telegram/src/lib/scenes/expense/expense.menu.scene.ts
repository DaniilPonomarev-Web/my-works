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
import { UserService } from '@money-app/user';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { TelegramService } from '../../telegram.service';
import { replyMarkups } from './expence.store';

@Injectable()
@Scene(scenes.expenseMenu)
export class expenseMenuScene {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly userService: UserService,
    private readonly telegramService: TelegramService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    const user = await this.userService.getByChatId(chatId);
    if (user && user.role === 'admin') {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.selectCategory,
        replyMarkups.expenseMenuSceneMenuAdmin
      );
      return;
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.selectCategory,
      replyMarkups.expenseMenuSceneMenuUser
    );
  }
  @SceneLeave()
  async onLeaveTelegram(@Ctx() ctx: any) {
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
