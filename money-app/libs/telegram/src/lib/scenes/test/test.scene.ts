import { Injectable } from '@nestjs/common';
import {
  Ctx,
  InjectBot,
  Message,
  On,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { RedisService } from '@money-app/redis';
import * as crypto from 'crypto';

@Injectable()
@Scene('TestScene')
export class TestScene {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly redisService: RedisService
  ) {}

  private sentMessages: number[] = []; // Массив для хранения идентификаторов отправленных сообщений

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const inline_keyboard = [
      [{ text: 'Добавить доход', callback_data: 'addIncome' }],
      [{ text: 'Добавть затрату', callback_data: 'addExpense' }],
      [{ text: 'Члены группы', callback_data: 'myGroup' }],
      [{ text: 'Aвторизация', callback_data: 'goAuth' }],
      [{ text: 'Главная страница', callback_data: 'goMainScene' }],
      [{ text: 'test', callback_data: 'myTest' }],
    ];
    const message = await ctx.reply('Меню:', {
      reply_markup: {
        inline_keyboard,
      },
    });
    this.sentMessages.push(message.message_id);
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    for (const messageId of this.sentMessages) {
      try {
        await ctx.deleteMessage(messageId);
      } catch (error) {
        // Обработка ошибки, если сообщение не найдено
        console.error(`Ошибка при удалении сообщения: ${messageId}`, error);
      }
    }
    this.sentMessages = []; // Очищаем массив идентификаторов отправленных сообщений
  }
}
