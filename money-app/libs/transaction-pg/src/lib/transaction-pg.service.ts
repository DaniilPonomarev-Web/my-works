import { Transaction } from '@money-app/entities';
import {
  ExpenseDataWithCategory,
  getEndDateOfCurrentWeek,
  getIncomeOrExpense,
  getStartDateOfCurrentWeek,
  IFinacesByDateWithCategory,
  TransactionPayload,
} from '@money-app/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';

@Injectable()
export class TransactionPgService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>
  ) {}

  async findOne(id: string) {
    const res = await this.transactionRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }

    return res;
  }

  async addTransaction(payload: TransactionPayload) {
    const res = await this.transactionRepo
      .createQueryBuilder()
      .insert()
      .values(payload)
      .orIgnore()
      .returning('*')
      .execute();
    return res.raw[0] ?? null;
  }

  // async getExpensesAndIncomeSummaryAdmin(accountId: string): Promise<any> {
  //   const currentDate = new Date();
  //   const startDateOfCurrentWeek = startOfWeek(currentDate, {
  //     weekStartsOn: 1,
  //   }); // Начало текущей недели (понедельник)
  //   const startDateOfCurrentMonth = startOfMonth(currentDate); // Начало текущего месяца

  //   const result = await this.transactionRepo
  //     .createQueryBuilder('transaction')
  //     .select([
  //       'ROUND(SUM(CASE WHEN DATE("EventDate") = CURRENT_DATE AND "Value" < 0 THEN "Value" ELSE 0 END), 2) AS DailyExpense',
  //       'ROUND(SUM(CASE WHEN DATE("EventDate") >= :startDateOfCurrentWeek AND DATE("EventDate") <= CURRENT_DATE AND "Value" < 0 THEN "Value" ELSE 0 END), 2) AS WeeklyExpense',
  //       'ROUND(SUM(CASE WHEN DATE_TRUNC(\'month\', "EventDate") = DATE_TRUNC(\'month\', CURRENT_DATE) AND "Value" < 0 THEN "Value" ELSE 0 END), 2) AS MonthlyExpense',
  //       'ROUND(SUM(CASE WHEN DATE("EventDate") = CURRENT_DATE AND "Value" > 0 THEN "Value" ELSE 0 END), 2) AS DailyIncome',
  //       'ROUND(SUM(CASE WHEN DATE("EventDate") >= :startDateOfCurrentWeek AND DATE("EventDate") <= CURRENT_DATE AND "Value" > 0 THEN "Value" ELSE 0 END), 2) AS WeeklyIncome',
  //       'ROUND(SUM(CASE WHEN DATE_TRUNC(\'month\', "EventDate") = DATE_TRUNC(\'month\', CURRENT_DATE) AND "Value" > 0 THEN "Value" ELSE 0 END), 2) AS MonthlyIncome',
  //     ])
  //     .where('transaction.AccountID = :accountId', { accountId })
  //     .setParameters({ startDateOfCurrentWeek })
  //     .getRawOne();
  //   console.warn(result);

  //   return result;
  // }
  async getExpensesAndIncomeSummaryAdmin(accountId: string): Promise<any> {
    // Функция для суммирования результатов по категориям
    const sumCategoryResult = (results: any[]): number => {
      return results.reduce((total: number, result: any) => {
        return total + parseFloat(result.summa);
      }, 0);
    };

    const dailyExpenseResult = await this.getFinanceWithCategoryToday(
      accountId,
      'expense',
      null
    );
    const weeklyExpenseResult = await this.getFinanceWithCategoryByWeek(
      accountId,
      'expense',
      null
    );
    const monthlyExpenseResult = await this.getFinanceWithCategoryByMonth(
      accountId,
      'expense',
      null
    );
    const yearExpenseResult = await this.getFinanceWithCategoryByYear(
      accountId,
      'expense',
      null
    );
    const dailyIncomeResult = await this.getFinanceWithCategoryToday(
      accountId,
      'income',
      null
    );
    const weeklyIncomeResult = await this.getFinanceWithCategoryByWeek(
      accountId,
      'income',
      null
    );
    const monthlyIncomeResult = await this.getFinanceWithCategoryByMonth(
      accountId,
      'income',
      null
    );

    const yearIncomeResult = await this.getFinanceWithCategoryByYear(
      accountId,
      'income',
      null
    );

    // Суммируем результаты для каждого периода времени
    const dailyExpense = sumCategoryResult(dailyExpenseResult);
    const weeklyExpense = sumCategoryResult(weeklyExpenseResult);
    const monthlyExpense = sumCategoryResult(monthlyExpenseResult);
    const yearExpense = sumCategoryResult(yearExpenseResult);
    const dailyIncome = sumCategoryResult(dailyIncomeResult);
    const weeklyIncome = sumCategoryResult(weeklyIncomeResult);
    const monthlyIncome = sumCategoryResult(monthlyIncomeResult);
    const yearIncome = sumCategoryResult(yearIncomeResult);

    const data = {
      dailyexpense: dailyExpense.toFixed(2),
      weeklyexpense: weeklyExpense.toFixed(2),
      monthlyexpense: monthlyExpense.toFixed(2),
      yearExpense: yearExpense.toFixed(2),
      dailyincome: dailyIncome.toFixed(2),
      weeklyincome: weeklyIncome.toFixed(2),
      monthlyincome: monthlyIncome.toFixed(2),
      yearIncome: yearIncome.toFixed(2),
    };

    return data;
  }

  async getExpensesAndIncomeSummaryUser(chatId: number): Promise<any> {
    const currentDate = new Date();
    const startDateOfCurrentWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );

    const result = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select([
        'ROUND(SUM(CASE WHEN DATE("EventDate") = CURRENT_DATE AND "Value" < 0 THEN "Value" ELSE 0 END), 2) AS DailyExpense',
        'ROUND(SUM(CASE WHEN DATE("EventDate") >= :startDateOfCurrentWeek AND "Value" < 0 THEN "Value" ELSE 0 END), 2) AS WeeklyExpense',
        'ROUND(SUM(CASE WHEN DATE_TRUNC(\'month\', "EventDate") = DATE_TRUNC(\'month\', CURRENT_DATE) AND "Value" < 0 THEN "Value" ELSE 0 END), 2) AS MonthlyExpense',
        'ROUND(SUM(CASE WHEN DATE("EventDate") = CURRENT_DATE AND "Value" > 0 THEN "Value" ELSE 0 END), 2) AS DailyIncome',
        'ROUND(SUM(CASE WHEN DATE("EventDate") >= :startDateOfCurrentWeek AND "Value" > 0 THEN "Value" ELSE 0 END), 2) AS WeeklyIncome',
        'ROUND(SUM(CASE WHEN DATE_TRUNC(\'month\', "EventDate") = DATE_TRUNC(\'month\', CURRENT_DATE) AND "Value" > 0 THEN "Value" ELSE 0 END), 2) AS MonthlyIncome',
      ])
      .where('transaction.ChatID = :chatId', { chatId })
      .setParameters({ startDateOfCurrentWeek })
      .getRawOne();
    return result;
  }

  async getFinanceWithCategoryToday(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = ' AND "GroupID" = :groupId';
    }

    const result = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select([
        '"CategoryID"',
        'ROUND(SUM(CASE WHEN DATE("EventDate") = CURRENT_DATE AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) AS summa',
      ])
      .where('"AccountID" = :accountId' + andGroupId, {
        accountId,
        groupId,
      })
      .groupBy('"CategoryID"')
      .having(
        'ROUND(SUM(CASE WHEN DATE("EventDate") = CURRENT_DATE AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) <> 0'
      )
      .getRawMany();

    return result;
  }

  async getFinanceWithCategoryByWeek(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = ' AND "GroupID" = :groupId';
    }

    const currentDate = new Date();
    const startDateOfCurrentWeek = startOfWeek(currentDate, {
      weekStartsOn: 1,
    }); // Начало текущей недели
    const endDateOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 }); // Конец текущей недели

    const result = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select([
        '"CategoryID"',
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentWeek AND :endDateOfCurrentWeek AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) AS summa',
      ])
      .where('"AccountID" = :accountId' + andGroupId, {
        accountId,
        groupId,
        startDateOfCurrentWeek,
        endDateOfCurrentWeek,
      })
      .groupBy('"CategoryID"')
      .having(
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentWeek AND :endDateOfCurrentWeek AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) <> 0'
      )
      .getRawMany();

    return result;
  }

  async getFinanceWithCategoryByMonth(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = ' AND "GroupID" = :groupId';
    }

    const currentDate = new Date();
    const startDateOfCurrentMonth = startOfMonth(currentDate); // Начало текущего месяца
    const endDateOfCurrentMonth = endOfMonth(currentDate); // Конец текущего месяца

    const result = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select([
        '"CategoryID"',
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentMonth AND :endDateOfCurrentMonth AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) AS summa',
      ])
      .where('"AccountID" = :accountId' + andGroupId, {
        accountId,
        groupId,
        startDateOfCurrentMonth,
        endDateOfCurrentMonth,
      })
      .groupBy('"CategoryID"')
      .having(
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentMonth AND :endDateOfCurrentMonth AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) <> 0'
      )
      .getRawMany();
    console.warn(result);

    return result;
  }

  async getFinanceWithCategoryByYear(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = ' AND "GroupID" = :groupId';
    }

    const currentDate = new Date();
    const startDateOfCurrentYear = startOfYear(currentDate); // Начало текущего года
    const endDateOfCurrentYear = endOfYear(currentDate); // Конец текущего года

    const result = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select([
        '"CategoryID"',
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentYear AND :endDateOfCurrentYear AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) AS summa',
      ])
      .where('"AccountID" = :accountId' + andGroupId, {
        accountId,
        groupId,
        startDateOfCurrentYear,
        endDateOfCurrentYear,
      })
      .groupBy('"CategoryID"')
      .having(
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentYear AND :endDateOfCurrentYear AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) <> 0'
      )
      .getRawMany();

    return result;
  }

  async getExpensesByMonthWithCategory(
    accountId: string,
    type: string,
    categoryId: string
  ) {
    const sign = getIncomeOrExpense(type);

    const currentDate = new Date();
    const startDateOfCurrentMonth = startOfMonth(currentDate); // Начало текущего месяца
    const endDateOfCurrentMonth = endOfMonth(currentDate); // Конец текущего месяца

    const result = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select([
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentMonth AND :endDateOfCurrentMonth AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) AS summa',
      ])
      .where('"CategoryID" = :categoryId AND "AccountID" = :accountId', {
        categoryId,
        accountId,
        startDateOfCurrentMonth,
        endDateOfCurrentMonth,
      })
      .groupBy('"CategoryID"')
      .having(
        'ROUND(SUM(CASE WHEN "EventDate" BETWEEN :startDateOfCurrentMonth AND :endDateOfCurrentMonth AND "Value" ' +
          sign +
          ' 0 THEN "Value" ELSE 0 END), 2) <> 0'
      )
      .getRawOne();
    console.warn(result);
    return result;
  }

  async getAccountIdsWithTransactionsToday(): Promise<string[]> {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );

    const transactionsToday = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select('DISTINCT "AccountID"')
      .where('transaction."EventDate" BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return transactionsToday.map((transaction: any) => transaction.AccountID);
  }

  async getFinancesByDate(
    accountId: string,
    type: string,
    groupId: string | null,
    dateFrom: string,
    dateTo: string
  ): Promise<ExpenseDataWithCategory[]> {
    let andGroupId = '';
    if (groupId) {
      andGroupId = ' AND "GroupID" = :groupId';
    }

    const transactions = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select(['transaction.CategoryID', 'SUM(transaction.Value) AS summa'])
      .where('transaction.Operation = :operation', { operation: type })
      .andWhere('"AccountID" = :accountId' + andGroupId, { accountId, groupId })
      .andWhere('transaction.EventDate >= :dateFrom', { dateFrom })
      .andWhere('transaction.EventDate <= :dateTo', { dateTo })
      .groupBy('transaction.CategoryID')
      .getRawMany();

    const formattedTransactions: IFinacesByDateWithCategory[] =
      transactions.map((transaction) => ({
        CategoryID: transaction.transaction_CategoryID,
        summa: parseFloat(transaction.summa),
      }));

    return formattedTransactions;
  }
}
