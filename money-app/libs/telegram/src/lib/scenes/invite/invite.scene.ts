import { Logger } from '@nestjs/common';
import { Action, Ctx, SceneLeave } from 'nestjs-telegraf';
import { validate } from 'email-validator';
import { phone } from 'phone';
import { Context, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';

import { UserService } from '@money-app/user';
import { InvitedsService } from '@money-app/inviteds';

import { messageForScenes } from '../../message.patterns';
import { replyMarkups } from './invate.store';
import { TelegramService } from '../../telegram.service';
import { scenes } from '../../scenesNames';
import { MailSenderService } from '@money-app/mail-sender';
import { InviteEmail } from '@money-app/shared';
import { GroupService } from '@money-app/group';

@Wizard(scenes.invate)
export class InviteScene {
  private readonly logger = new Logger(InviteScene.name);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly mailSenderService: MailSenderService,
    private readonly groupService: GroupService,
    private readonly invitedsService: InvitedsService
  ) {}

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.logger.debug(`${ctx.chat.id} scene leave`);
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }

  // просим поделиться номером телефона
  @WizardStep(0)
  async phoneRequest(
    @Context() ctx: Scenes.WizardContext & { session: any; scene: any }
  ) {
    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.phoneRequestInvite,
      replyMarkups.cancelInvite
    );
    ctx.wizard.next();
  }

  // просим поделиться email
  @WizardStep(1)
  async emailRequest(@Context() ctx: any) {
    const answer = ctx.update['message'].text;
    const answerId = ctx.update['message'].message_id;
    this.telegramService.rememberMessage(ctx, answerId);
    const phoneNumber = answer.replace(/\s/g, '');

    if (!phone(phoneNumber, { country: 'RUS' })?.isValid) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.InviteScene.phoneNotValid,
        replyMarkups.cancelInvite
      );
      return;
    }

    ctx.scene.state['phone'] = phoneNumber;

    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.emailRequest,
      replyMarkups.cancelInvite
    );
    ctx.wizard.next();
  }

  // Проверяем инфу
  @WizardStep(2)
  async dataConfirm(@Context() ctx: any) {
    const answer = ctx.update['message'].text;
    const answerId = ctx.update['message'].message_id;
    this.telegramService.rememberMessage(ctx, answerId);

    if (!validate(answer)) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.InviteScene.emailNotValid,
        replyMarkups.cancelInvite
      );
      return;
    }

    ctx.scene.state['email'] = answer;
    ctx.wizard.next(); // Переход к следующему шагу
    await ctx.wizard.step(ctx); // Вызов обработчика следующего шага
  }

  @WizardStep(3)
  async selectGroup(@Context() ctx: any) {
    const chatId = ctx.chat.id;
    const account = await this.userService.getAccountByChatId(chatId);
    if (!account) {
      return;
    }
    const groups = await this.groupService.findAllByAccountId(account.id);

    if (!groups || groups.length === 1) {
      const user = await this.userService.getByChatId(chatId);
      if (!user) {
        this.logger.error(`not found user by chatId ${chatId}`);
        return;
      }
      const group = await this.groupService.findOne(user.groupId);
      await this.telegramService.reply(
        ctx,
        messageForScenes.InviteScene.dataConfirm(
          ctx.scene.state.phone,
          ctx.scene.state.email,
          group
        ),
        replyMarkups.sendInvite
      );
      return;
    }

    await this.telegramService.reply(
      ctx,
      'Выберите группу:',
      replyMarkups.selectGroup(groups)
    );
  }

  @Action(/selectGroup:(.+)/)
  async selectGroupHandle(@Context() ctx: any) {
    const selectedGroupId = ctx.match[1];
    ctx.scene.state['groupId'] = selectedGroupId;
    let group = null;
    group = await this.groupService.findOne(selectedGroupId);
    if (!group) {
      group = null;
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.dataConfirm(
        ctx.scene.state.phone,
        ctx.scene.state.email,
        group
      ),
      replyMarkups.sendInvite
    );
    return;
  }

  @Action('cancelSelectGroup')
  async cancelSelectGroupHandle(@Context() ctx: any) {
    const chatId = ctx.chat.id;
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      this.logger.error(`not found user by chatId ${chatId}`);
      return;
    }
    const group = await this.groupService.findOne(user.groupId);
    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.dataConfirm(
        ctx.scene.state.phone,
        ctx.scene.state.email,
        group
      ),
      replyMarkups.sendInvite
    );
    return;
  }
  //TODO шаг с выбором группы если её больше 1
  @Action('action:send')
  async sendHandle(@Context() ctx: any) {
    const chatId = ctx.chat.id;
    this.logger.debug(`${chatId} action: send`);
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      this.logger.error(`Нет пользователя с  ${chatId}`);
      return;
    }

    const invite = await this.invitedsService.create({
      accountId: user.accountId,
      groupId: ctx.scene.state.groupId || user.groupId,
      phone: ctx.scene.state.phone,
      email: ctx.scene.state.email,
    });

    if (!invite) {
      this.logger.error(
        `chatId: ${chatId} message: Failed to create invitation`
      );
      return;
    }

    const link = `https://t.me/${process.env['TELEGRAM_BOT_USERNAME']}?start=${invite.hash}`;

    const inviteDataMail: InviteEmail = {
      email: ctx.scene.state.email,
      link: link,
    };

    const sendInvite = await this.mailSenderService.sendMessageInvite(
      inviteDataMail
    );

    if (!sendInvite) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.InviteScene.failedSending,
        null
      );
      setTimeout(() => {
        return ctx.scene.enter(scenes.main);
      }, 1500);
      return;
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.successInvitationSending(invite.email, link),
      null
    );
    setTimeout(() => {
      return ctx.scene.enter(scenes.main);
    }, 1500);
  }

  @Action('action:repeat')
  async repeatHandle(@Context() ctx: any) {
    const chatId = ctx.update.callback_query.from.id;

    ctx.scene.state.phone = undefined;
    ctx.scene.state.email = undefined;
    ctx.scene.state.groupId = undefined;

    this.telegramService.clearMessageStorage(ctx, chatId);

    this.logger.debug(`${chatId} action: repeat`);
    ctx.wizard.selectStep(0);
    await ctx.wizard.step(ctx);
    await ctx.answerCbQuery();
    return;
  }

  @Action('action:cancel')
  async cancelHandle(@Context() ctx: any) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.debug(`${chatId} action: cancel`);
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
    ctx.scene.enter(scenes.main);
    return;
  }
}
