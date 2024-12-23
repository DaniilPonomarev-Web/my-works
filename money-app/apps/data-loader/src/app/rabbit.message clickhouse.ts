import {
  ClickhouseClientService,
  Transaction,
} from '@money-app/clickhouse-client';
import {
  ADD_TRANSACTION,
  DashboardReport,
  GET_DASHBOARD_ADMIN,
  GET_DASHBOARD_USER,
  GET_FINANCE_MONTH,
  ExpenseDataWithCategory,
  MonthlyExpenseResponse,
  TransactionPayload,
  GET_FINANCE_YEAR,
  GET_FINANCE_TODAY,
  GET_FINANCE_WEEK,
} from '@money-app/shared';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
interface SummaryData {
  meta: [
    { name: 'DailyExpense'; type: 'Float64' },
    { name: 'WeeklyExpense'; type: 'Float64' },
    { name: 'MonthlyExpense'; type: 'Float64' },
    { name: 'DailyIncome'; type: 'Float64' },
    { name: 'WeeklyIncome'; type: 'Float64' },
    { name: 'MonthlyIncome'; type: 'Float64' }
  ];
  data: [
    {
      DailyExpense: number;
      WeeklyExpense: number;
      MonthlyExpense: number;
      DailyIncome: number;
      WeeklyIncome: number;
      MonthlyIncome: number;
    }
  ];
  rows: number;
  statistics: { elapsed: number; rows_read: number; bytes_read: number };
}
@Controller()
export class BotMessagePattern {
  private logger = new Logger(BotMessagePattern.name);

  constructor(private readonly chService: ClickhouseClientService) {}

  @MessagePattern({ cmd: ADD_TRANSACTION })
  async handleAddTransaction(
    @Payload() payload: TransactionPayload
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.chService.addTransaction({
        AccountID: payload.AccountID,
        UserID: payload.UserID,
        FirstName: payload.FirstName,
        GroupID: payload.GroupID,
        GroupName: payload.GroupName,
        ChatID: payload.ChatID,
        CategoryID: payload.CategoryID,
        CategoryName: payload.CategoryName,
        CurrencyID: payload.CurrencyID,
        CurrencyName: payload.CurrencyName,
        Value: payload.Operation === 'expense' ? -payload.Value : payload.Value,
        EventDate: payload.EventDate,
      });

      this.logger.log(`AccountID: ${payload.AccountID}, status: ${result}`);
      return { success: true, message: 'Транзакция успешно добавлена' };
    } catch (error) {
      this.logger.error(
        `AccountID: ${payload.AccountID}, displayText: ${error.message}`
      );
      return {
        success: false,
        message: 'Произошла ошибка при добавлении транзакции',
      };
    }
  }

  @MessagePattern({ cmd: GET_DASHBOARD_ADMIN })
  async getDashboardAdmin(@Payload() payload: any) {
    this.logger.log(`${payload.accountId} get dashbord data`);

    const accountId = payload.accountId;

    const expensesAndIncomeSummary: any =
      await this.chService.getExpensesAndIncomeSummaryAdmin(accountId);

    const report: DashboardReport = {
      expenses: {
        day: expensesAndIncomeSummary?.data[0]?.DailyExpense ?? 0,
        week: expensesAndIncomeSummary?.data[0]?.WeeklyExpense ?? 0,
        month: expensesAndIncomeSummary?.data[0]?.MonthlyExpense ?? 0,
        year: expensesAndIncomeSummary?.data[0]?.yearExpense ?? 0,
      },
      income: {
        day: expensesAndIncomeSummary?.data[0]?.DailyIncome ?? 0,
        week: expensesAndIncomeSummary?.data[0]?.WeeklyIncome ?? 0,
        month: expensesAndIncomeSummary?.data[0]?.MonthlyIncome ?? 0,
        year: expensesAndIncomeSummary?.data[0]?.yearIncome ?? 0,
      },
    };

    return report;
  }

  @MessagePattern({ cmd: GET_DASHBOARD_USER })
  async getDashboardUser(@Payload() payload: any) {
    this.logger.log(`${payload.chatId} get dashbord data`);

    const chatId = payload.chatId;

    const expensesAndIncomeSummary: any =
      await this.chService.getExpensesAndIncomeSummaryUser(chatId);

    const report: DashboardReport = {
      expenses: {
        day: expensesAndIncomeSummary?.data[0]?.DailyExpense ?? 0,
        week: expensesAndIncomeSummary?.data[0]?.WeeklyExpense ?? 0,
        month: expensesAndIncomeSummary?.data[0]?.MonthlyExpense ?? 0,
        year: expensesAndIncomeSummary?.YearExpense ?? 0,
      },
      income: {
        day: expensesAndIncomeSummary?.data[0]?.DailyIncome ?? 0,
        week: expensesAndIncomeSummary?.data[0]?.WeeklyIncome ?? 0,
        month: expensesAndIncomeSummary?.data[0]?.MonthlyIncome ?? 0,
        year: expensesAndIncomeSummary?.YearIncome ?? 0,
      },
    };

    return report;
  }

  @MessagePattern({ cmd: GET_FINANCE_TODAY })
  async getExpensesByToday(
    @Payload() payload: any
  ): Promise<ExpenseDataWithCategory[]> {
    this.logger.log(`${payload.accountId} getexpences`);

    const accountId = payload.accountId;
    const type = payload.type;
    const groupId = payload.groupId;

    const expences = (await this.chService.getFinanceWithCategoryToday(
      accountId,
      type,
      groupId
    )) as MonthlyExpenseResponse;

    const report: ExpenseDataWithCategory[] = expences.data;

    return report;
  }
  @MessagePattern({ cmd: GET_FINANCE_WEEK })
  async getExpensesByWeek(
    @Payload() payload: any
  ): Promise<ExpenseDataWithCategory[]> {
    this.logger.log(`${payload.accountId} getexpences`);

    const accountId = payload.accountId;
    const type = payload.type;
    const groupId = payload.groupId;

    const expences = (await this.chService.getFinanceWithCategoryByWeek(
      accountId,
      type,
      groupId
    )) as MonthlyExpenseResponse;

    const report: ExpenseDataWithCategory[] = expences.data;

    return report;
  }
  @MessagePattern({ cmd: GET_FINANCE_MONTH })
  async getExpensesByMonth(
    @Payload() payload: any
  ): Promise<ExpenseDataWithCategory[]> {
    this.logger.log(`${payload.accountId} getexpences`);

    const accountId = payload.accountId;
    const type = payload.type;
    const groupId = payload.groupId;

    const expences = (await this.chService.getFinanceWithCategoryByMonth(
      accountId,
      type,
      groupId
    )) as MonthlyExpenseResponse;

    const report: ExpenseDataWithCategory[] = expences.data;

    return report;
  }
  @MessagePattern({ cmd: GET_FINANCE_YEAR })
  async getExpensesByYear(
    @Payload() payload: any
  ): Promise<ExpenseDataWithCategory[]> {
    this.logger.log(`${payload.accountId} getexpences`);

    const accountId = payload.accountId;
    const type = payload.type;
    const groupId = payload.groupId;

    const expences = (await this.chService.getFinanceWithCategoryByYear(
      accountId,
      type,
      groupId
    )) as MonthlyExpenseResponse;

    const report: ExpenseDataWithCategory[] = expences.data;

    return report;
  }

  // @MessagePattern({ cmd: GET_DASHBOARD })
  // async getDashboard(@Payload() payload: any) {
  //   this.logger.log(`${payload.accountId} get dashbord data`);

  //   const accountId = payload.accountId;
  //   const serverTime = dayjs();
  //   const day = serverTime.day();
  //   const week = serverTime.week();
  //   const month = serverTime.month();
  //   const year = serverTime.year();

  //   const [expensesPerDay, expensesPerWeek, expensesPerMonth] =
  //     (await Promise.all([
  //       this.chService.expensesForToday(accountId, day, month, year),
  //       this.chService.expensesForWeek(accountId, week, month, year),
  //       this.chService.expensesForMonth(accountId, month, year),
  //     ])) as any;

  //   const report: DashboardReport = {
  //     expenses: {
  //       day: expensesPerDay?.data[0]?.sum ?? 0,
  //       week: expensesPerWeek?.data[0]?.sum ?? 0,
  //       month: expensesPerMonth?.data[0]?.sum ?? 0,
  //     },
  //     income: {
  //       day: expensesPerDay?.data[0]?.sum ?? 0,
  //       week: expensesPerWeek?.data[0]?.sum ?? 0,
  //       month: expensesPerMonth?.data[0]?.sum ?? 0,
  //     },
  //   };

  //   return report;
  // }
}
