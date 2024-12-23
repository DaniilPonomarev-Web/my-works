import { Injectable, Logger } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, SceneLeave, Start } from 'nestjs-telegraf';
import { TelegramService } from '../../telegram.service';
import { replyMarkups } from './group.store';
import { messageForScenes } from '../../message.patterns';

@Injectable()
@Scene('GroupScene')
export class GroupScene {
  private readonly logger = new Logger(GroupScene.name);

  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.update.message.from.id;
    this.logger.debug(`chatId: ${chatId} message: scene start`);

    await this.telegramService.reply(
      ctx,
      messageForScenes.Main.menu,
      replyMarkups.menu
    );
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.logger.debug(`${ctx.chat.id} scene leave`);
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
