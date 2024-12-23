import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramNotificationService {
  private readonly botToken: string;
  private readonly chatIdNewOrders: string;
  private readonly chatIdNewUsers: string;
  private readonly chatIdAdminsEdit: string;
  private readonly chatIdOneCExchange: string;

  constructor() {
    this.botToken = '7242407135:AAEmVvuBTJ_iZJoTvixlOLRtXcS9u5lwmnI';
    this.chatIdNewOrders = '-1002493318114';
    this.chatIdNewUsers = '-1002240578063';
    this.chatIdAdminsEdit = '-4278743101';
    this.chatIdOneCExchange = '-1002486573482';
  }

  /**
   * Отправляет сообщение в Telegram о новом заказе.
   * @param message Текст сообщения.
   * @throws Error если произошла ошибка при отправке сообщения.
   */
  async sendMessageNewOrders(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const params = {
      chat_id: this.chatIdNewOrders,
      text: message,
      parse_mode: 'HTML',
    };

    try {
      await axios.post(url, params);
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      throw error;
    }
  }

  /**
   * Отправляет сообщение в Telegram о новом пользователе сайта.
   * @param message Текст сообщения.
   * @throws Error если произошла ошибка при отправке сообщения.
   */
  async sendMessageNewUser(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const params = {
      chat_id: this.chatIdNewUsers,
      text: message,
      parse_mode: 'HTML',
    };

    try {
      await axios.post(url, params);
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      throw error;
    }
  }

  /**
   * Отправляет сообщение в Telegram о изменении заказа;
   * @param message Текст сообщения.
   * @throws Error если произошла ошибка при отправке сообщения.
   */
  async sendMessageEditOrders(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const params = {
      chat_id: this.chatIdAdminsEdit,
      text: message,
      parse_mode: 'HTML',
    };

    try {
      await axios.post(url, params);
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      throw error;
    }
  }

  async sendNotificationToTelegramOneCExchange(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const params = {
      chat_id: this.chatIdOneCExchange,
      text: message,
      parse_mode: 'HTML',
    };
    try {
      await axios.post(url, params);
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      throw error;
    }
  }
}
