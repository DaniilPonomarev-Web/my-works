import { UserService } from '@money-app/user';
import { Logger } from '@nestjs/common';
import { validate } from 'email-validator';
import {
  Action,
  Context,
  Ctx,
  Message,
  On,
  SceneLeave,
  Wizard,
  WizardStep,
} from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { scenes } from '../../scenesNames';
import { RegistrationSceneService } from './registration.scene.service';
import { messageForScenes } from '../../message.patterns';
import { regExtra } from './registrationHands.store';
import { InvitedsService } from '@money-app/inviteds';
import { TelegramService } from '../../telegram.service';
import { normalizePhoneNumber } from '@money-app/shared';
import { AppLoggerLokiService } from '@money-app/logger-loki';

@Wizard(scenes.regHands)
export class RegistrationSceneHands {
  private logger = new Logger(RegistrationSceneHands.name);

  constructor(
    private readonly userService: UserService,
    private readonly invitedsService: InvitedsService,
    private readonly telegramService: TelegramService,
    private readonly regService: RegistrationSceneService,
    private readonly appLoggerLokiService: AppLoggerLokiService
  ) {}

  @WizardStep(0)
  async phoneRequest(@Context() ctx: Scenes.WizardContext & { scene: any }) {
    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.phoneRequest,
      regExtra.phoneRequest
    );
    const photoUrl = 'https://disk.yandex.ru/i/sQ1PXKSVMeoj_A'; //TODO bot сделать оптимально

    await this.telegramService.replyImage(
      ctx,
      photoUrl,
      messageForScenes.InviteScene.phoneRequestSupport
    );

    ctx.wizard.next();
  }

  @On('contact')
  @WizardStep(1)
  async onContact(@Message() message: any, @Ctx() ctx: any) {
    const { phone_number, first_name, last_name } = message.contact;
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.regHands} начал регистрацию`,
      scenes.regHands
    );
    await this.telegramService.rememberMessage(ctx, message.message_id);

    const isInvite = ctx?.scene?.state?.invite?.id ? true : false;
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.regHands} по инвайту? - ${isInvite}`,
      scenes.regHands
    );
    if (isInvite) {
      const normalizedPhoneInvited = normalizePhoneNumber(
        ctx.scene.state.invite.phone
      );
      const normalizedPhoneState = normalizePhoneNumber(
        message.contact.phone_number
      );

      if (normalizedPhoneInvited !== normalizedPhoneState) {
        this.appLoggerLokiService.error(
          `${ctx.chat.id} на сцене  ${scenes.regHands} не смог сравнить два номера ${normalizedPhoneInvited} и ${normalizedPhoneState}`,
          scenes.regHands
        );
        await this.telegramService.reply(
          ctx,
          messageForScenes.RegistrationHands.phoneDoesNotMatch
        );

        return;
      }
    }

    ctx.scene.state['phone'] = phone_number;
    ctx.scene.state['name'] = first_name;
    ctx.scene.state['lastName'] = last_name;

    // await this.telegramService.reply(
    //   ctx,
    //   messageForScenes.RegistrationHands.emailRequest
    // );

    ctx.wizard.next();
    await ctx.wizard.step(ctx); // Вызов обработчика следующего шага
  }

  @WizardStep(2)
  async dataConfirm(@Context() ctx: any) {
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.regHands} перешел на шаг три`,
      scenes.regHands
    );

    // const answer = ctx.update['message'].text;
    // const answerId = ctx.update['message'].message_id;
    // await this.telegramService.rememberMessage(ctx, answerId);

    // if (!validate(answer)) {
    //   await this.telegramService.reply(
    //     ctx,
    //     messageForScenes.RegistrationHands.emailNotValid,
    //     null
    //   );
    //   return;
    // }

    ctx.scene.state['email'] = '-';
    await this.telegramService.reply(
      ctx,
      messageForScenes.RegistrationHands.dataConfirm(
        ctx.scene.state.phone,
        ctx.scene.state.name,
        ctx.scene.state.lastName,
        ctx.scene.state.email
      ),
      regExtra.sendRegistration
    );
  }

  @Action('action:send')
  async sendHandle(@Context() ctx: any) {
    const chatId = ctx.update.callback_query.from.id;

    const isInvite = ctx?.scene?.state?.invite?.id ? true : false;

    // Создаем/получаем зависимости
    const accountId = await this.regService.getAccount(ctx.scene.state, chatId);
    const groupId = await this.regService.getGroup(
      ctx.scene.state,
      chatId,
      accountId
    );
    const user = await this.userService.create(
      accountId,
      groupId,
      chatId,
      ctx.scene.state.name ?? null,
      ctx.scene.state.lastName ?? null,
      ctx.scene.state.phone,
      isInvite ? 'user' : 'admin'
    );
    this.logger.debug(`chatId: ${chatId}, message: save session`);

    ctx.session['userId'] = user.id;
    await this.telegramService.reply(
      ctx,
      messageForScenes.RegistrationHands.successRegistrationHands(
        ctx.scene.state.name
      )
    );

    const inviteId = ctx?.scene?.state?.invite?.id;
    if (inviteId && inviteId != '') {
      await this.invitedsService.updateInvite(ctx?.scene?.state?.invite?.id);
    }
    // setTimeout(() => {
    //   return ctx.scene.enter(scenes.main);
    // }, 1500);

    await ctx.scene.enter(scenes.main);
    return;
  }
  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.regHands} Заверщил регистрацию успешно`,
      scenes.regHands
    );
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
