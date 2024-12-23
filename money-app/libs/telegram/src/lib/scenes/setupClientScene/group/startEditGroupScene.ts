import { Injectable, Logger } from '@nestjs/common';
import {
  Ctx,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
  Action,
} from 'nestjs-telegraf';
import { UserService } from '@money-app/user';
import { scenes } from '../../../scenesNames';
import { messageForScenes } from '../../../message.patterns';
import { GroupService } from '@money-app/group';
import { TelegramService } from '../../../telegram.service';
import { SceneContext } from 'telegraf/typings/scenes';
import { Update as UpdateCtx } from 'telegraf/typings/core/types/typegram';
import { startGroupSceneMarkup } from './store';

@Injectable()
@Scene(scenes.edit.group.start)
export class StartEditGroupsScene {
  private logger = new Logger(StartEditGroupsScene.name);
  constructor(
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
    private readonly groupService: GroupService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.messageMenuEditGroup,
      startGroupSceneMarkup
    );
    return;
  }

  @Action(/goEditGroup/)
  async editGroup(@Ctx() ctx: any & { update: any }) {
    await ctx.scene.enter(scenes.edit.group.edit);
    return;
  }

  @Action(/goAddGroup/)
  async setupGroupScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек группы (mainScene)`);
    await ctx.scene.enter(scenes.edit.group.add);
    return;
  }

  @Action(/goSettings/)
  async goSettings(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек группы (mainScene)`);
    await ctx.scene.enter(scenes.main);
    return;
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.telegramService.deleteMessages(ctx.chat.id, ctx.scene.state.messages);
    this.logger.log(`${ctx.chat.id} Ушел с StartEditGroupScene`);
  }
}
