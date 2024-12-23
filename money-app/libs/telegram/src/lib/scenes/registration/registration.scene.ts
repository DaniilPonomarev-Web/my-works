import { Injectable, Logger } from '@nestjs/common';
import {
  Action,
  Ctx,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
} from 'nestjs-telegraf';
import { registrationSceneAdd } from '../../menu';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { TelegramService } from '../../telegram.service';
import { AppLoggerLokiService } from '@money-app/logger-loki';

@Injectable()
@Scene(scenes.reg)
export class RegistrationScene {
  private logger = new Logger(RegistrationScene.name);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly appLoggerLokiService: AppLoggerLokiService
  ) {}

  @Start()
  @SceneEnter()
  async onStart(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.update.message.from.id;
    this.logger.debug(`chatId: ${chatId} message: scene start`);

    const sendMessageOptions = {
      chat_id: chatId,
      text: messageForScenes.Registration.questionRegistration,
      reply_markup: JSON.stringify(registrationSceneAdd(chatId)),
    };

    await this.telegramService.reply(ctx, sendMessageOptions.text, {
      reply_markup: sendMessageOptions.reply_markup,
    });
  }

  @Action(/registration/)
  async registration(@Ctx() ctx: any) {
    const cbQuery = ctx.update.callback_query;
    const chatId = cbQuery['data'].split(':')[1];
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.reg} начал регистрацию сам`,
      'bot'
    );
    // const isInvite = ctx?.scene?.state?.invite?.id ? true : false;
    // if (isInvite) {
    //   const normalizedPhoneInvited = normalizePhoneNumber(
    //     ctx.scene.state.invite.phone
    //   );
    //   const normalizedPhoneState = normalizePhoneNumber(
    //     ctx?.scene?.state?.phone
    //   );

    //   if (normalizedPhoneInvited !== normalizedPhoneState) {
    //     await this.telegramService.reply(
    //       ctx,
    //       messageForScenes.RegistrationHands.phoneDoesNotMatch
    //     );
    //     return;
    //   }
    // }

    const invite = ctx?.scene.state?.invite;
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.reg} уходит на регистрацию руками по инвайту - ${invite}`,
      'bot'
    );
    await ctx.scene.enter(scenes.regHands, { invite });
    // console.log('invite: ' + invite);

    return;
    // try {
    //   const isInvite = ctx?.scene?.state?.invite?.id ? true : false;

    //   const fullUser = await this.regService.getUser(chatId);

    //   if (!fullUser) {
    //     // TODO Если не найден, то запросить данные у пользователя
    //     //await ctx.scene.enter('regitsrationSceneHands');
    //     console.log('!TUSER');
    //   }

    //   // const phone = ctx?.scene?.state?.phone;

    //   if (isInvite) {
    //     const normalizedPhoneInvited = normalizePhoneNumber(
    //       ctx.scene.state.invite.phone
    //     );
    //     const normalizedPhoneState = normalizePhoneNumber(
    //       ctx?.scene?.state?.phone
    //     );

    //     if (normalizedPhoneInvited !== normalizedPhoneState) {
    //       await this.telegramService.reply(
    //         ctx,
    //         messageForScenes.RegistrationHands.phoneDoesNotMatch
    //       );
    //       return;
    //     }
    //   }

    //   // Создаем/получаем зависимости
    //   const accountId = await this.regService.getAccount(
    //     ctx.scene.state,
    //     chatId
    //   );
    //   const groupId = await this.regService.getGroup(
    //     ctx.scene.state,
    //     chatId,
    //     accountId
    //   );

    //   // Создаем пользователя
    //   const user = await this.userService.create(
    //     accountId,
    //     groupId,
    //     chatId,
    //     fullUser.firstName ?? null,
    //     fullUser.lastName ?? null,
    //     fullUser.phone,
    //     isInvite ? 'user' : 'admin'
    //   );
    //   this.logger.debug(`chatId: ${chatId}, message: save session`);
    //   ctx.session['userId'] = user.id;

    //   await this.telegramService.reply(
    //     ctx,
    //     `${fullUser.firstName}, Добро пожаловать в бота!`
    //   );

    //   const inviteId = ctx?.scene?.state?.invite?.id;
    //   await this.invitedsService.updateInvite(inviteId);
    //   setTimeout(() => {
    //     ctx.scene.enter(scenes.main);
    //   }, 1500);
    //   return;
    // } catch (error) {
    //   this.logger.error(error);
    //   const invite = ctx?.scene.state?.invite;
    //   await ctx.scene.enter(scenes.regHands, { invite });
    //   return;
    // }
  }
  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.logger.debug(`${ctx.chat.id} scene leave`);
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
