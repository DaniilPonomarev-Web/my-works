import { Injectable, Logger } from '@nestjs/common';
import {
  Ctx,
  InjectBot,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
  Action,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegramService } from '../../telegram.service';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { SceneContext } from 'telegraf/typings/scenes';
import { Update as UpdateCtx } from 'telegraf/typings/core/types/typegram';
import { SetupClientSceneMenu } from './store';

@Injectable()
@Scene(scenes.edit.setup)
export class SetupClientScene {
  private logger = new Logger(SetupClientScene.name);

  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly telegramService: TelegramService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    await this.telegramService.reply(
      ctx,
      messageForScenes.setupClientScene.settingMenuMessage,
      SetupClientSceneMenu
    );
    return;
  }

  @Action(/SetupGroupScene/)
  async setupGroupScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек группы`);
    await ctx.scene.enter(scenes.edit.group.start);
  }

  @Action(/SetupCategoriesScene/)
  async setupCategoriesScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек категорий`);
    await ctx.scene.enter(scenes.edit.category);
  }
  @Action(/SetupUsersScene/)
  async setupUsersScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек пользователей`);
    await ctx.scene.enter(scenes.edit.users);
  }

 
  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
    this.logger.log(`${ctx.chat.id} Ушел с mainScene`);
  }
}
