import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  ADD_TRANSACTION,
  GET_CATEGORIES_BYGROUP,
  GET_GROUPS,
  DashboardReport,
  TransactionPayload,
  GET_DASHBOARD_ADMIN,
  GET_DASHBOARD_USER,
  GET_FINANCE_MONTH,
  ExpenseDataWithCategory,
  GET_FINANCE_WEEK,
  GET_FINANCE_YEAR,
  GET_FINANCE_TODAY,
  GET_FINANCE_MONTH_BY_CAT,
  GET_ACCOUNTS_WHOBUY_TODAY,
  GET_EXPENSE_BY_DATE,
  GET_INCOME_BY_DATE,
} from '@money-app/shared';

@Injectable()
export class RabbitService {
  constructor(@Inject('MONEY_SERVICE') private rabbitClient: ClientProxy) {}

  /**
   * Сохранить транзакцию
   * @param payload Данные транзации
   * @returns
   */
  addTransaction(payload: TransactionPayload) {
    return firstValueFrom(
      this.rabbitClient.send({ cmd: ADD_TRANSACTION }, payload)
    );
  }

  /**
   * Получить данные для дашборда аккаунта на главной странице
   * @param accountId ID аккаунта
   * @returns
   */
  getDashboardAdmin(accountId: string): Promise<DashboardReport> {
    return firstValueFrom(
      this.rabbitClient.send({ cmd: GET_DASHBOARD_ADMIN }, { accountId })
    );
  }

  /**
   * Получить данные для дашборда аккаунта на главной странице
   * @param chatId chatId юзера
   * @returns
   */
  getDashboardUser(chatId: number): Promise<DashboardReport> {
    return firstValueFrom(
      this.rabbitClient.send({ cmd: GET_DASHBOARD_USER }, { chatId })
    );
  }

  /**
   * Получить покупки за сегодня с категориями для админа
   * @param accountId ID аккаунта
   * @returns
   */
  getFinancesByToday(
    accountId: string,
    type: string,
    groupId: string | null
  ): Promise<ExpenseDataWithCategory[]> {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_FINANCE_TODAY },
        { accountId, type, groupId }
      )
    );
  }
  /**
   * Получить покупки за менсяц с категориями для админа
   * @param accountId ID аккаунта
   * @returns
   */
  getFinancesByMonth(
    accountId: string,
    type: string,
    groupId: string | null
  ): Promise<ExpenseDataWithCategory[]> {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_FINANCE_MONTH },
        { accountId, type, groupId }
      )
    );
  }

  /**
   * Получить покупки за месяц по категории для админа
   * @param accountId ID аккаунта
   * @param categoryId ID аккаунта
   * @returns
   */
  getFinancesByMonthByCategory(
    accountId: string,
    type: string,
    categoryId: string | null
  ): Promise<any> {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_FINANCE_MONTH_BY_CAT },
        { accountId, type, categoryId }
      )
    );
  }

  /**
   * Получить покупки за неделю с категориями для админа
   * @param accountId ID аккаунта
   * @returns
   */
  getFinancesByWeek(
    accountId: string,
    type: string,
    groupId: string | null
  ): Promise<ExpenseDataWithCategory[]> {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_FINANCE_WEEK },
        { accountId, type, groupId }
      )
    );
  }
  /**
   * Получить покупки за неделю с категориями для админа
   * @param accountId ID аккаунта
   * @returns
   */
  getFinancesByYear(
    accountId: string,
    type: string,
    groupId: string | null
  ): Promise<ExpenseDataWithCategory[]> {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_FINANCE_YEAR },
        { accountId, type, groupId }
      )
    );
  }

  /**
   * Получить покупки за определенные даты с категориями для админа
   * @param accountId ID аккаунта
   * @returns
   */
  getAccountExpensesByDate(
    accountId: string,
    groupId: string | null,
    dateFrom: string,
    dateTo: string
  ): Promise<ExpenseDataWithCategory[]> {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_EXPENSE_BY_DATE },
        { accountId, groupId, dateFrom, dateTo }
      )
    );
  }

  /**
   * Получить доходы за определенные даты с категориями для админа
   * @param accountId ID аккаунта
   * @returns
   */
  getAccountIncomesByDate(
    accountId: string,
    groupId: string | null,
    dateFrom: string,
    dateTo: string
  ): Promise<ExpenseDataWithCategory[]> {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_INCOME_BY_DATE },
        { accountId, groupId, dateFrom, dateTo }
      )
    );
  }

  /** //TODO удалить и сделать как Transaction
   * Получить данные по группам клиента
   * @param payload clientID
   * @returns
   */
  getGroups(clientId: string) {
    return firstValueFrom(
      this.rabbitClient.send({ cmd: GET_GROUPS }, clientId)
    );
  }
  // getGroups(clientId: string) {
  //   return this.rabbitClient
  //     .send({ cmd: GET_GROUPS }, clientId)
  //     .toPromise()
  //     .catch((err) => {
  //       // this.logger.error(err, { label: 'getAbonentHistoryLast' }));
  //       console.log('null GET_GROUPS');

  //       return null;
  //     });
  // }

  /**
   * Получить данные по категориям клиента
   * @param clientId Id клиента
   * @param groupId Id группы
   * @returns
   */
  getGroupsWithCategories(clientId: string, groupId: string) {
    return firstValueFrom(
      this.rabbitClient.send(
        { cmd: GET_CATEGORIES_BYGROUP },
        { clientId, groupId }
      )
    );
  }

  /**
   * Получить все id аккаунтов которые совершали покупку сегодня
   * @returns
   */
  getAccountIdsWithTransactionsToday() {
    return firstValueFrom(
      this.rabbitClient.send({ cmd: GET_ACCOUNTS_WHOBUY_TODAY }, {})
    );
  }

  // /**
  //  * Отправить сообщение пользвателю об успешной оплате
  //  * @param chatIdPayment Id клиента
  //  * @param message Сообщение
  //  * @returns
  //  */
  // sendPaymentSuccessNotification(chatIdPayment: string, message: string) {
  //   return firstValueFrom(
  //     this.rabbitClient.send(
  //       { cmd: SEND_PAYMENTS_SUCCEESS_NOTIFICATION },
  //       { chatIdPayment, message }
  //     )
  //   );
  // }
}
