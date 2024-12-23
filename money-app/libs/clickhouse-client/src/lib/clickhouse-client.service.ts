import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClickHouseService, Transaction } from './clickhouse-client.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';
import dayjs = require('dayjs');
import { getIncomeOrExpense } from '@money-app/shared';
@Injectable()
export class ClickhouseClientService {
  private clickHouseService: ClickHouseService;
  private logger = new Logger(ClickhouseClientService.name);

  constructor(
    @Inject('CLICKHOUSE_CLIENT') private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.clickHouseService =
      this.client.getService<ClickHouseService>('ClickHouse');
  }

  async addTransaction(data: Transaction) {
    const eventDate = dayjs(data?.EventDate, {
      format: 'YYYY-MM-DD hh:mm:ss',
    }); //TODO вынести в functions
    const eventDateFormatted = eventDate.format('YYYY-MM-DD hh:mm:ss');
    const sql = `INSERT INTO transaction 
      (ID, AccountID, UserID, FirstName, ChatID, GroupID, 
      GroupName, CurrencyID, CurrencyName, CategoryID, 
      CategoryName, Value, EventDate)
      VALUES(generateUUIDv4(),
      toUUID('${data.AccountID}'), toUUID('${data.UserID}'),
      '${data.FirstName}', ${data.ChatID}, toUUID('${data.GroupID}'),
      '${data.GroupName}', toUUID('${data.CurrencyID}'), '${data.CurrencyName}',
      toUUID('${data.CategoryID}'),'${data.CategoryName}', ${data.Value}, toDateTime('${eventDateFormatted}', 'Europe/Moscow'))`;
    const result = await this.execute(sql);
    return result;
  }

  async getExpensesAndIncomeSummaryAdmin(accountId: string) {
    const sql = `
    SELECT
      ROUND(SUM(CASE WHEN toDate(EventDate) = today() AND Value < 0 THEN Value ELSE 0 END), 2) AS DailyExpense,
      ROUND(SUM(CASE WHEN toDate(EventDate) >= today() - INTERVAL '1 week' AND Value < 0 THEN Value ELSE 0 END), 2) AS WeeklyExpense,
      ROUND(SUM(CASE WHEN toStartOfMonth(EventDate) = toStartOfMonth(today()) AND Value < 0 THEN Value ELSE 0 END), 2) AS MonthlyExpense,
      ROUND(SUM(CASE WHEN toDate(EventDate) = today() AND Value > 0 THEN Value ELSE 0 END), 2) AS DailyIncome,
      ROUND(SUM(CASE WHEN toDate(EventDate) >= today() - INTERVAL '1 week' AND Value > 0 THEN Value ELSE 0 END), 2) AS WeeklyIncome,
      ROUND(SUM(CASE WHEN toStartOfMonth(EventDate) = toStartOfMonth(today()) AND Value > 0 THEN Value ELSE 0 END), 2) AS MonthlyIncome
    FROM money.transaction
    WHERE AccountID = '${accountId}' 
    FORMAT JSON;
  `;

    const result = await this.query(sql);
    return new Promise((resolve) => {
      result.subscribe((d) => {
        resolve(JSON.parse(d));
      });
    });
  }

  async getExpensesAndIncomeSummaryUser(chatId: number) {
    const sql = `
    SELECT
      ROUND(SUM(CASE WHEN toDate(EventDate) = today() AND Value < 0 THEN Value ELSE 0 END), 2) AS DailyExpense,
      ROUND(SUM(CASE WHEN toDate(EventDate) >= today() - INTERVAL '1 week' AND Value < 0 THEN Value ELSE 0 END), 2) AS WeeklyExpense,
      ROUND(SUM(CASE WHEN toStartOfMonth(EventDate) = toStartOfMonth(today()) AND Value < 0 THEN Value ELSE 0 END), 2) AS MonthlyExpense,
      ROUND(SUM(CASE WHEN toDate(EventDate) = today() AND Value > 0 THEN Value ELSE 0 END), 2) AS DailyIncome,
      ROUND(SUM(CASE WHEN toDate(EventDate) >= today() - INTERVAL '1 week' AND Value > 0 THEN Value ELSE 0 END), 2) AS WeeklyIncome,
      ROUND(SUM(CASE WHEN toStartOfMonth(EventDate) = toStartOfMonth(today()) AND Value > 0 THEN Value ELSE 0 END), 2) AS MonthlyIncome
    FROM money.transaction
    WHERE ChatID = '${chatId}' 
    FORMAT JSON;
  `;

    const result = await this.query(sql);
    return new Promise((resolve) => {
      result.subscribe((d) => {
        resolve(JSON.parse(d));
      });
    });
  }

  async getFinanceWithCategoryToday(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = `AND GroupID = '${groupId}' `;
    }
    const sql = `
      SELECT 
        CategoryID,
        ROUND(SUM(CASE WHEN toDate(EventDate) = today() AND Value ${sign} 0 THEN Value ELSE 0 END), 2) AS summa
    FROM money.transaction
    WHERE Value ${sign} 0 AND AccountID = '${accountId}' ${andGroupId}
    GROUP BY CategoryID
    FORMAT JSON;
  `;

    const result = await this.query(sql);

    return new Promise((resolve) => {
      result.subscribe((d) => {
        resolve(JSON.parse(d));
      });
    });
  }
  async getFinanceWithCategoryByWeek(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = `AND GroupID = '${groupId}' `;
    }
    const sql = `
      SELECT 
        CategoryID,
        ROUND(SUM(CASE WHEN toDate(EventDate) >= today() - INTERVAL 1 WEEK AND Value ${sign} 0 THEN Value ELSE 0 END), 2) AS summa
    FROM money.transaction
    WHERE Value ${sign} 0 AND AccountID = '${accountId}' ${andGroupId} 
    GROUP BY CategoryID
    FORMAT JSON;
  `;

    const result = await this.query(sql);
    return new Promise((resolve) => {
      result.subscribe((d) => {
        resolve(JSON.parse(d));
      });
    });
  }

  async getFinanceWithCategoryByMonth(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = `AND GroupID = '${groupId}' `;
    }
    const sql = `
      SELECT 
        CategoryID,
        ROUND(SUM(CASE WHEN toStartOfMonth(EventDate) = toStartOfMonth(today()) AND Value ${sign} 0 THEN Value ELSE 0 END), 2) AS summa
    FROM money.transaction
    WHERE Value ${sign} 0 AND AccountID = '${accountId}' ${andGroupId}
    GROUP BY CategoryID
    FORMAT JSON;
  `;

    const result = await this.query(sql);
    return new Promise((resolve) => {
      result.subscribe((d) => {
        resolve(JSON.parse(d));
      });
    });
  }

  async getFinanceWithCategoryByYear(
    accountId: string,
    type: string,
    groupId: string | null
  ) {
    const sign = getIncomeOrExpense(type);
    let andGroupId = '';
    if (groupId) {
      andGroupId = `AND GroupID = '${groupId}' `;
    }
    const sql = `
      SELECT 
        CategoryID,
        ROUND(SUM(CASE WHEN toStartOfYear(EventDate) = toStartOfYear(today()) AND Value ${sign} 0 THEN Value ELSE 0 END), 2) AS summa
    FROM money.transaction
    WHERE Value ${sign} 0 AND AccountID = '${accountId}' ${andGroupId} 
    GROUP BY CategoryID
    FORMAT JSON;
  `;

    const result = await this.query(sql);
    console.log(result);

    return new Promise((resolve) => {
      result.subscribe((d) => {
        resolve(JSON.parse(d));
      });
    });
  }

  // async expensesForToday(
  //   accountId: string,
  //   day: number,
  //   month: number,
  //   year: number
  // ) {
  //   const sql = `
  //   Select
  //     AccountID,
  //     toYear(EventDate) as year,
  //     toMonth(EventDate) as month,
  //     toDayOfWeek(EventDate) as day,
  //     SUM(Value) as sum
  //   FROM transaction
  //   WHERE toYear(EventDate) = ${year}
  //         and toMonth(EventDate) = ${month}
  //         and day = ${day}
  //         and AccountID = '${accountId}'
  //   GROUP BY
  //     AccountID,
  //     toYear(EventDate),
  //     toMonth(EventDate),
  //     toDayOfWeek(EventDate)
  //   FORMAT JSON;
  //   `;

  //   const result = await this.query(sql);
  //   return new Promise((resolve) => {
  //     result.subscribe((d) => {
  //       resolve(JSON.parse(d));
  //     });
  //   });
  // }

  // async expensesForWeek(
  //   accountId: string,
  //   week: number,
  //   month: number,
  //   year: number
  // ) {
  //   const sql = `
  //   Select
  //     AccountID,
  //     toYear(EventDate) as year,
  //     toMonth(EventDate) as month,
  //     toWeek(EventDate) as week,
  //     SUM(Value) as sum
  //   FROM transaction
  //   WHERE toYear(EventDate) = ${year}
  //         and toMonth(EventDate) = ${month}
  //         and toWeek(EventDate) = ${week}
  //         and AccountID = '${accountId}'
  //   GROUP BY
  //     AccountID,
  //     toYear(EventDate),
  //     toMonth(EventDate),
  //     toWeek(EventDate)
  //   FORMAT JSON;
  //   `;

  //   const result = await this.query(sql);
  //   return new Promise((resolve) => {
  //     result.subscribe((d) => {
  //       resolve(JSON.parse(d));
  //     });
  //   });
  // }

  // async expensesForMonth(accountId: string, month: number, year: number) {
  //   const sql = `
  //   Select
  //     AccountID,
  //     toYear(EventDate) as year,
  //     toMonth(EventDate) as month,
  //     SUM(Value) as sum
  //   FROM transaction
  //   WHERE toYear(EventDate) = ${year}
  //         and toMonth(EventDate) = ${month}
  //         and AccountID = '${accountId}'
  //   GROUP BY
  //     AccountID,
  //     toYear(EventDate),
  //     toMonth(EventDate)
  //   FORMAT JSON;
  //   `;

  //   const result = await this.query(sql);
  //   return new Promise((resolve) => {
  //     result.subscribe((d) => {
  //       resolve(JSON.parse(d));
  //     });
  //   });
  // }

  /**
   * Выполнить запрос в clickHouse
   * @param query Запрос
   * @returns
   */
  private async execute(query: string) {
    const executeProcess = this.clickHouseService.ExecuteQuery({
      database: `${process.env['CH_DATABASE']}`,
      output_format: 'json',
      query,
    });

    const result = await firstValueFrom(executeProcess);

    // Проверяем ошибку
    if (result?.exception) {
      this.logger.error(result.exception);
      throw Error(result.exception.displayText);
    }

    // Проверяем статус выполнения запроса
    if (result?.progress?.writtenRows?.low) {
      return true;
    }

    // TODO Обработать другие ответы
    return false;
  }

  private async query(query: string) {
    const result = await this.clickHouseService
      .ExecuteQuery({
        database: `${process.env['CH_DATABASE']}`,
        output_format: 'json',
        query,
      })
      .pipe(
        map((data) => {
          return data.output?.toString('utf8');
        })
      );

    return result;
  }
}
