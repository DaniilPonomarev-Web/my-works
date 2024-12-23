import { RabbitService } from '@money-app/rabbit';
import { Injectable, Logger } from '@nestjs/common';
import {
  Ctx,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
  Action,
} from 'nestjs-telegraf';
import { TelegramService } from '../../telegram.service';
import { UserService } from '@money-app/user';
import dayjs from 'dayjs';
import { messageForScenes } from '../../message.patterns';
import { replyMarkups } from './store';
import { scenes } from '../../scenesNames';
import {
  DashboardReport,
  subscribeCheck,
  subscribeCheckWithText,
} from '@money-app/shared';
import { RedisService } from '@money-app/redis';
import { AppLoggerLokiService } from '@money-app/logger-loki';

@Injectable()
@Scene(scenes.main)
export class MainScene {
  private logger = new Logger(MainScene.name);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly rabbitService: RabbitService,
    private readonly redisService: RedisService,
    private readonly appLoggerLokiService: AppLoggerLokiService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    const user = await this.userService.getByChatId(chatId);
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.main} Зашел на главную сцену`,
      'bot'
    );
    if (!user) {
      this.appLoggerLokiService.error(
        `${ctx.chat.id} на сцене  ${scenes.main} НЕ НАЙДЕН В БАЗЕ`,
        'bot'
      );
      await ctx.scene.leave();
      return;
    }
    await this.redisService.delSessionTelegram();
    const userAccount = await this.userService.getAccountByChatId(chatId);

    if (!userAccount) {
      this.appLoggerLokiService.error(
        `${ctx.chat.id} на сцене  ${scenes.main} userAccount НЕ НАЙДЕН В БАЗЕ`,
        'bot'
      );

      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserClientMessage,
        null
      );
      return;
    }
    const subscriptionStatus = subscribeCheck(userAccount.subscribe);

    if (!subscriptionStatus) {
      this.appLoggerLokiService.error(
        `${ctx.chat.id} на сцене  ${scenes.main} без подписки зашел на главную сцену`,
        'bot'
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.notSubscribe,
        null
      );
    }

    const userRole = user.role;
    const inlineKeyboard = replyMarkups.getMainInlineKeyboard(
      userRole,
      subscriptionStatus
    );

    await this.telegramService.reply(
      ctx,
      messageForScenes.Main.menu,
      inlineKeyboard
    );
  }

  @Action(/infoAboutMe/)
  async infoAboutMe(@Ctx() ctx: any & { update: any }) {
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.main} запросил информацию о себе`,
      'bot'
    );
    const chatId = ctx.chat.id;

    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      this.appLoggerLokiService.error(
        `${ctx.chat.id} на сцене  ${scenes.main} НЕ НАЙДЕН В БАЗЕ`,
        'bot'
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserMessage,
        null
      );

      return;
    }

    const userGroup = await this.userService.getGroupsByChatId(chatId);
    if (!userGroup) {
      this.appLoggerLokiService.error(
        `${ctx.chat.id} на сцене  ${scenes.main} не найдены группы`,
        'bot'
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserGroupMessage,
        null
      );
      return;
    }

    const userAccount = await this.userService.getAccountByChatId(chatId);
    if (!userAccount) {
      this.appLoggerLokiService.error(
        `${ctx.chat.id} на сцене  ${scenes.main} не найден userAccount`,
        'bot'
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserClientMessage,
        null
      );

      return;
    }

    const userAccAdmin = await this.userService.getUserByAccount(
      userAccount.id,
      'admin'
    );
    if (!userAccAdmin) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserClientMessage,
        null
      );
      return;
    }

    const userCreatedDate = dayjs(user?.created, {
      format: 'ddd MMM DD YYYY HH:mm:ss',
    });
    const formattedDate = userCreatedDate.format('DD.MM.YYYY в HH:mm');

    const subscriptionStatus = subscribeCheckWithText(userAccount.subscribe);

    // TODO - Текст сообщения
    const userInfo = messageForScenes.all.userInfoMessage(
      chatId,
      user,
      userGroup,
      userAccount.id,
      userAccAdmin.firstName,
      formattedDate,
      subscriptionStatus
    );
    await this.telegramService.reply(ctx, userInfo, null);

    await ctx.answerCbQuery();
  }
  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    ctx.answerCbQuery();
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.main} ушел с главной страницы`,
      'bot'
    );
    // this.logger.debug(`${ctx.chat.id} MainScene leave`);
    await this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
