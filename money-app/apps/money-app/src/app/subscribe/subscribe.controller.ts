import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '@money-app/user';
import { IUser } from '@money-app/entities';
import { YookassaService } from '@money-app/yookassa';
import { AccountService } from '@money-app/account';
import { RabbitService } from '@money-app/rabbit';

@Controller('subscribe')
export class SubscribeApiController {
  constructor(
    private readonly userService: UserService,
    private readonly yookassaService: YookassaService,
    private readonly accountService: AccountService,
    private readonly rabbitService: RabbitService
  ) {}

  @Post('webhook')
  // @UseGuards(BasicAuthMiddleware)
  async handleWebhook(@Body() payload: any): Promise<boolean> {
    // Проверка успешности платежа
    if (payload.event === 'payment.succeeded') {
      const paymentData =
        await this.yookassaService.getPaymentByTransactionData(
          payload.object.description
        );
      if (!paymentData) {
        console.warn('НЕТ paymentData');
        return;
      }

      const updatePayment = await this.yookassaService.updatePayment(
        paymentData.id
      );

      if (!updatePayment) {
        return;
      }

      const updateSubscriptionDate =
        await this.accountService.updateSubscriptionDate(
          paymentData.accountId,
          paymentData.duration
        );

      if (!updateSubscriptionDate) {
        return false;
      }
      return true;
      // // Отправка уведомления об успешном платеже //TODO bot
      // this.yookassaService.sendPaymentSuccessNotification(paymentData);
    }
  }

  @Get('testCron')
  async testCron() {
    const accounts = await this.accountService.getAllAccountsId();
    console.warn(accounts);
    const transactionAccounts =
      await this.rabbitService.getAccountIdsWithTransactionsToday();
    console.warn(transactionAccounts);

    // Фильтруем массив accounts, оставляем только те аккаунты, которых нет в transactionAccounts
    const filteredAccounts = accounts.filter(
      (account) => !transactionAccounts.includes(account.id)
    );

    console.warn(filteredAccounts);

    return filteredAccounts;
  }
  // @Get('health')
  // async healthCheck() {
  //   // return { status: 'ok' };
  //   console.log('132');

  //   const paymentData = {
  //     accountId: '51a9e9ac-2294-4ac9-afea-194c06a2fbcf',
  //     duration: 'year',
  //   };
  //   const data = await this.accountService.updateSubscriptionDate(
  //     paymentData.accountId,
  //     paymentData.duration
  //   );
  //   return data;
  // }
}
