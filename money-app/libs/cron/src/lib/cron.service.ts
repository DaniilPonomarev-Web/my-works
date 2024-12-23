import { AccountService } from '@money-app/account';
import { RabbitService } from '@money-app/rabbit';
import { TelegramService } from '@money-app/telegram';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import dayjs from 'dayjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ExtendSubscribeMenu, InfoCronMenu } from 'libs/telegram/src/lib/menu';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    private readonly telegramService: TelegramService,
    private readonly accountService: AccountService,
    private readonly rabbitService: RabbitService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  // @Cron(CronExpression.EVERY_10_SECONDS)
  async getAccountsSubscribeTomorrow() {
    console.log('Выполнено каждый день в 11 часов дня');
    // Сначала делаем запрос на все аккаунты у которых подписка закончится завтра
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const accounts = await this.accountService.getAccountsSubscribeTomorrow(
      tomorrow
    );
    if (accounts.length <= 0) {
      return;
    }
    const message = `Ваша подписка истекает завтра!`;

    for (const account of accounts) {
      const chatId = account;
      // Отправляем админам сообщения, что их подписка истекает через  sendMessageUsers c задержкой 5 секунд
      setTimeout(async () => {
        await this.telegramService.sendMessageUsers(
          chatId.toString(),
          message,
          ExtendSubscribeMenu
        );
      }, 5000);
    }
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async getAccountsWithoutExpense() {
    console.log('Выполнено каждый день в 1 AT PM УВЕДОМЛЯЛКА часов вечера');
    const accounts = await this.accountService.getAllAccountsId();
    // console.warn(accounts);
    if (!accounts) {
      return;
    }
    const transactionAccounts =
      await this.rabbitService.getAccountIdsWithTransactionsToday();
    // console.warn(transactionAccounts);

    // Фильтруем массив accounts, оставляем только те аккаунты, которых нет в transactionAccounts
    const filteredAccounts = accounts.filter(
      (account) => !transactionAccounts.includes(account.id)
    );

    console.warn(filteredAccounts);
    const messages = [
      'Привет! 🌟 Не забудьте занести свои доходы и расходы за сегодняшний день. Подробная финансовая отчётность поможет вам лучше понять, куда уходят ваши деньги и как управлять финансами более эффективно! 💰✨',
      'Привет! 🌞 Давайте сделаем ваш день ещё успешнее! Запишите свои доходы и расходы за сегодня и получите уверенность в своих финансах. Пусть ваш день будет ярким и продуктивным! 💪💸',
      'Привет! 🚀 Не забывайте фиксировать свои финансовые движения каждый день. Это поможет вам быть в курсе своих финансов и достичь ваших целей быстрее. Начните прямо сейчас! 💼💡',
      'Здравствуйте! 💼 Напоминаю о важности учета своих доходов и расходов. Регулярное ведение финансового журнала поможет вам контролировать свои финансы и достигать поставленных финансовых целей. Пусть ваш день будет продуктивным и успешным! 💪📈',
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    for (const account of filteredAccounts) {
      const chatId = account.key;
      setTimeout(async () => {
        await this.telegramService.sendMessageUsers(
          chatId.toString(),
          message,
          InfoCronMenu
        );
      }, 5000);
    }
  }
}
