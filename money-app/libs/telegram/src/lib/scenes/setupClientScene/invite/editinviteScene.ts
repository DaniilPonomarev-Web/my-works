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
import { goSettings } from '../../../menu';
import { messageForScenes } from '../../../message.patterns';
import { TelegramService } from '../../../telegram.service';
import { InvitedsService } from '@money-app/inviteds';
import { log } from 'console';
import dayjs from 'dayjs';
import { InviteEmail } from '@money-app/shared';
import { MailSenderService } from '@money-app/mail-sender';
import { RedisService } from '@money-app/redis';
import { goSettingsUser, invitedsMarkup } from './store';
import { SceneContext } from 'telegraf/typings/scenes';

@Injectable()
@Scene(scenes.edit.invite)
export class EditInviteScene {
  private logger = new Logger(EditInviteScene.name);
  constructor(
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
    private readonly invitedService: InvitedsService,
    private readonly redisService: RedisService,
    private readonly mailSenderService: MailSenderService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);

    // await this.telegramService.reply(
    //   ctx,
    //   messageForScenes.editInviteScene.hello,
    //   null
    // );

    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }
    const clientId = userClient.id;

    const inviteds = await this.invitedService.findAllByClientId(clientId);
    if (inviteds.length === 0) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editInviteScene.notInviteds,
        goSettingsUser
      );
      return;
      await this.telegramService.reply(
        ctx,
        messageForScenes.editUsersScene.goSettingsOne,
        goSettings
      );
    }

    const currentDate = new Date();
    // Разделяем массив приглашений на три категории
    const actualInviteds = inviteds.filter(
      (invited) => invited.validity > currentDate && invited.used === false
    );
    const usedInvitations = inviteds.filter((invited) => invited.used === true);
    const expiredInvitations = inviteds.filter(
      (invited) => invited.validity < currentDate && invited.used === false
    );

    const actualCount = actualInviteds.length;
    const usedCount = usedInvitations.length;
    const expiredCount = expiredInvitations.length;

    await this.telegramService.reply(
      ctx,
      messageForScenes.editInviteScene.selectInvitedsGroup,
      invitedsMarkup.sortInviteds(
        actualCount,
        usedCount,
        expiredCount,
        clientId
      )
    );
    await this.telegramService.reply(
      ctx,
      messageForScenes.editUsersScene.goSettingsOne,
      goSettings
    );
  }

  @Action(/actualInviteds:.+/)
  async getActualInviteds(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const clientId = cbQuery['data'].split(':')[1];

    const inviteds = await this.invitedService.findActualByClientId(clientId);
    for (let InviteIndex = 0; InviteIndex < inviteds.length; InviteIndex++) {
      const invite = inviteds[InviteIndex];

      const inviteCreatedDate = dayjs(invite.created);
      const formatDateCreated = inviteCreatedDate.format('DD.MM.YYYY в HH:mm');

      const inviteValidityDate = dayjs(invite.validity);
      const formatDateValidity =
        inviteValidityDate.format('DD.MM.YYYY в HH:mm');

      const inviteKey = await this.redisService.setInvitionButton(invite);
      await this.telegramService.reply(
        ctx,
        messageForScenes.editInviteScene.inviteInfo(
          invite,
          formatDateCreated,
          formatDateValidity
        ),
        invitedsMarkup.editActualInvitedsMarkup(invite, inviteKey)
      );
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editInviteScene.notInviteds,
      goSettings
    );
  }

  @Action(/usedInvitations:.+/)
  async getUsedInvitations(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const clientId = cbQuery['data'].split(':')[1];

    const inviteds = await this.invitedService.findUsedByClientId(clientId);
    for (let InviteIndex = 0; InviteIndex < inviteds.length; InviteIndex++) {
      const invite = inviteds[InviteIndex];

      const inviteCreatedDate = dayjs(invite.created);
      const formatDateCreated = inviteCreatedDate.format('DD.MM.YYYY в HH:mm');

      const inviteValidityDate = dayjs(invite.validity);
      const formatDateValidity =
        inviteValidityDate.format('DD.MM.YYYY в HH:mm');

      await this.telegramService.reply(
        ctx,
        messageForScenes.editInviteScene.inviteInfo(
          invite,
          formatDateCreated,
          formatDateValidity
        ),
        invitedsMarkup.editUsedInvitedsMarkup(invite.id)
      );
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editInviteScene.notInviteds,
      goSettings
    );
  }

  @Action(/expiredInvitations:.+/)
  async getExpiredInvitations(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const clientId = cbQuery['data'].split(':')[1];

    const inviteds = await this.invitedService.findExpiredByClientId(clientId);
    for (let InviteIndex = 0; InviteIndex < inviteds.length; InviteIndex++) {
      const invite = inviteds[InviteIndex];

      const inviteCreatedDate = dayjs(invite.created);
      const formatDateCreated = inviteCreatedDate.format('DD.MM.YYYY в HH:mm');

      const inviteValidityDate = dayjs(invite.validity);
      const formatDateValidity =
        inviteValidityDate.format('DD.MM.YYYY в HH:mm');

      await this.telegramService.reply(
        ctx,
        messageForScenes.editInviteScene.inviteInfo(
          invite,
          formatDateCreated,
          formatDateValidity
        ),
        invitedsMarkup.editExpiredInvitedsMarkup(invite.id)
      );
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editInviteScene.notInviteds,
      goSettings
    );
  }

  @Action(/resendActualInvite:.+/)
  async resendActualInvite(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const inviteKey = cbQuery['data'].split(':')[1];
    const invite = await this.redisService.getInvitionButton(inviteKey);
    if (!invite) {
      console.log('нет инвайта');
      return;
    }
    const link = `https://t.me/${process.env['TELEGRAM_BOT_USERNAME']}?start=${invite?.hash}`;
    const inviteDataMail: InviteEmail = {
      email: invite.email,
      link: link,
    };

    const sendInvite = await this.mailSenderService.sendMessageInvite(
      inviteDataMail
    );

    if (!sendInvite) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.InviteScene.failedSending,
        goSettings
      );
      return;
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.successInvitationSending(invite.email, link),
      goSettings
    );
  }

  @Action(/deleteInvite:.+/)
  async deleteInvite(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const inviteId = cbQuery['data'].split(':')[1];
    const deleteInvite = await this.invitedService.deleteInviteds(inviteId);
    if (!deleteInvite) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editInviteScene.failDelete,
        null
      );
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editInviteScene.successDelete,
      null
    );

    // setTimeout(() => {
    //   ctx.scene.enter(scenes.edit.invite);
    // }, 1500);
    await ctx.scene.reenter();
  }

  @Action(/extendInvite:.+/)
  async extendInvite(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const inviteId = cbQuery['data'].split(':')[1];
    const extendInvite = await this.invitedService.extendInvite(inviteId);
    if (!extendInvite) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editInviteScene.failExtend,
        null
      );
      return;
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editInviteScene.successExtend,
      null
    );
    // setTimeout(() => {
    //   ctx.scene.enter(scenes.edit.invite);
    // }, 1500);
    await ctx.scene.reenter();
  }

  @Action(/SetupUsersScene/)
  async setupUsersScene(@Ctx() ctx: SceneContext & { update: any }) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену настроек пользователей`);
    await ctx.scene.enter(scenes.edit.users);
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.telegramService.deleteMessages(ctx.chat.id, ctx.scene.state.messages);
    this.logger.log(`${ctx.chat.id} Ушел с EditInviteScene`);
  }
}
