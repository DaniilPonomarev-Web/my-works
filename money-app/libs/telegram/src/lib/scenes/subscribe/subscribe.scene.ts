import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  Action,
  Ctx,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
} from 'nestjs-telegraf';
import { TelegramService } from '../../telegram.service';
import { replyMarkups } from './subscribe.store';
import { messageForScenes } from '../../message.patterns';
import { scenes } from '../../scenesNames';
import { Variables } from '../../variables';
import { IPayment, IPaymentData } from '@money-app/entities';
import { YookassaService } from '@money-app/yookassa';
import { YooKassaRespose, subscribeCheck } from '@money-app/shared';
import { UserService } from '@money-app/user';
import { AppLoggerLokiService } from '@money-app/logger-loki';

interface CallbackQuery {
  data: string;
}
@Injectable()
@Scene(scenes.subscribe)
export class SubscribeScene {
  private readonly logger = new Logger(SubscribeScene.name);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly yookassaService: YookassaService,
    private readonly userService: UserService,
    private readonly appLoggerLokiService: AppLoggerLokiService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.chat.id;
    this.logger.debug(`chatId: ${chatId} message: scene subscribe;`);
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.subscribe} зашел на сцену подписок `,
      'bot'
    );
    const userAccount = await this.userService.getAccountByChatId(chatId);
    if (!userAccount) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserClientMessage,
        null
      );
      return;
    }
    const subscriptionStatus = subscribeCheck(userAccount.subscribe);

    if (!subscriptionStatus) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.subscribeScene.notSubscribe,
        null
      );

      await this.telegramService.reply(
        ctx,
        messageForScenes.subscribeScene.subscribePrices,
        replyMarkups.menu
      );
      return;
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.subscribeScene.subscribePrices,
      replyMarkups.menuExtend
    );
    return;
  }

  @Action(/subscribe:.+/)
  async canceledEvent(@Ctx() ctx: any & { update: any }) {
    const state = ctx.scene.state;
    await ctx.answerCbQuery();
    const cbQuery: CallbackQuery = ctx.update.callback_query;
    const timeSubscribe = cbQuery.data.split(
      ':'
    )[1] as keyof typeof subscribePrice;
    // ctx.reply(timeSubscribe);
    // Получаем цифру продолжительности подписки из объекта subscribePrice

    const { subscribePrice } = Variables;

    const price = subscribePrice[timeSubscribe];
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.subscribe} выбрал подписку на время ${subscribePrice[timeSubscribe]} `,
      'bot'
    );
    if (!price) {
      ctx.reply('Ошибка: Неверная продолжительность подписки.');
      return;
    }
    if (price !== undefined) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.subscribeScene.subscribeSelectedPrice(price),
        replyMarkups.buySubscribe(price)
      );
    }

    state['timeSubscribe'] = timeSubscribe;
    return;
  }
  @Action(/buySubscribe:.+/)
  async buySubscribe(@Ctx() ctx: any & { update: any }) {
    const state = ctx.scene.state;

    const chatId = ctx.chat.id;
    await ctx.answerCbQuery();
    const cbQuery = ctx.update.callback_query;
    const priceString = cbQuery['data'].split(':')[1];
    const price: number = parseFloat(priceString);

    if (isNaN(price)) {
      console.error('Ошибка: Невозможно преобразовать цену в число.');
      return;
    }

    const userAccount = await this.userService.getAccountByChatId(chatId);
    if (!userAccount) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserClientMessage,
        null
      );

      return;
    }

    const description = `Подписка от ${chatId} на сумму ${price}`;
    const uuidPayment = uuidv4();
    const payloadPayment: IPaymentData = {
      accountId: userAccount.id,
      amount: price,
      transactionData: uuidPayment,
      duration: state['timeSubscribe'],
      description: description,
      status: false,
    };
    const createPayment: IPayment =
      await this.yookassaService.createPaymentForUser(payloadPayment);
    if (!createPayment) {
      return;
    }
    const payment: YooKassaRespose | null =
      await this.yookassaService.createPayment(
        price,
        `https://t.me/MP_money_bot`,
        uuidPayment
      );
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.subscribe} запросил ссылку на оплату по uuidPayment=${uuidPayment} `,
      'bot'
    );
    if (!payment) {
      await this.telegramService.reply(
        ctx,
        `Не удалось получить ссылку на оплату, повторите позже`,
        replyMarkups.buySubscribe(price)
      );
      return;
    }
    await this.telegramService.reply(
      ctx,
      `Оплатить на официальном сайте ЮКаssa:`,
      replyMarkups.paymentButton(payment.confirmation.confirmation_url)
    );
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.subscribe} хер знает что дальше делал `,
      'bot'
    );
  }
  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    const state = ctx.scene.state;
    state['timeSubscribe'] = undefined;
    this.appLoggerLokiService.log(
      `${ctx.chat.id} на сцене  ${scenes.subscribe} ушел `,
      'bot'
    );
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
