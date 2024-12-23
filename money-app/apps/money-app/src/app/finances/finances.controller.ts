import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserService } from '@money-app/user';
import { CategoryService } from '@money-app/category';
import { RabbitService } from '@money-app/rabbit';
import { IBodyForTransictionsByDate } from '@money-app/shared';

@Controller('finances')
export class FinancesApiController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly rabbitService: RabbitService
  ) {}

  /* Расходы */
  @Get('getExpensesByToday')
  async getExpensesByToday(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getExpencesByPeriod = await this.rabbitService.getFinancesByToday(
      user.accountId,
      'expense',
      user.groupId
    );

    const resultArray = [];

    for (const expenseData of getExpencesByPeriod) {
      const category = await this.categoryService.findOne(
        expenseData.CategoryID
      );

      if (category) {
        const totalExpense = Math.abs(expenseData.summa);
        const categoryObject = {
          category: category.name,
          totalExpense: totalExpense,
        };
        resultArray.push(categoryObject);
      }
    }
    return resultArray;
  }

  @Get('getExpensesByWeek')
  async getExpensesByWeek(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getExpencesByPeriod = await this.rabbitService.getFinancesByWeek(
      user.accountId,
      'expense',
      user.groupId
    );

    const categoryExpenses: Record<string, number> = {};
    const resultArray = [];

    for (const expenseData of getExpencesByPeriod) {
      const category = await this.categoryService.findOne(
        expenseData.CategoryID
      );

      if (category) {
        if (categoryExpenses[category.name]) {
          categoryExpenses[category.name] += Math.abs(expenseData.summa);
        } else {
          categoryExpenses[category.name] = Math.abs(expenseData.summa);
        }
      }
    }

    for (const categoryName in categoryExpenses) {
      const totalExpense = categoryExpenses[categoryName];
      const categoryObject = {
        category: categoryName,
        totalExpense: totalExpense,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }
  @Get('expensesMonth')
  async getExpensesByMonth(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getExpencesByPeriod = await this.rabbitService.getFinancesByMonth(
      user.accountId,
      'expense',
      user.groupId
    );

    const resultArray = [];

    for (const expenseData of getExpencesByPeriod) {
      const category = await this.categoryService.findOne(
        expenseData.CategoryID
      );

      if (category) {
        const totalExpense = Math.abs(expenseData.summa);
        const categoryObject = {
          category: category.name,
          limit: category.limit, // Используем значение limit из объекта category
          totalExpense: totalExpense,
        };
        resultArray.push(categoryObject);
      }
    }
    return resultArray;
  }

  @Get('getExpensesByYear')
  async getExpensesByYear(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getExpencesByPeriod = await this.rabbitService.getFinancesByYear(
      user.accountId,
      'expense',
      user.groupId
    );

    const categoryExpenses: Record<string, number> = {};
    const resultArray = [];

    for (const expenseData of getExpencesByPeriod) {
      const category = await this.categoryService.findOne(
        expenseData.CategoryID
      );

      if (category) {
        if (categoryExpenses[category.name]) {
          categoryExpenses[category.name] += Math.abs(expenseData.summa);
        } else {
          categoryExpenses[category.name] = Math.abs(expenseData.summa);
        }
      }
    }

    for (const categoryName in categoryExpenses) {
      const totalExpense = categoryExpenses[categoryName];
      const categoryObject = {
        category: categoryName,
        totalExpense: totalExpense,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }

  /* Доходы */
  @Get('getIncomesByToday')
  async getIncomesByToday(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getIncomesByPeriod = await this.rabbitService.getFinancesByToday(
      user.accountId,
      'income',
      user.groupId
    );

    const categoryIncomes: Record<string, number> = {};
    const resultArray = [];

    for (const incomeData of getIncomesByPeriod) {
      const category = await this.categoryService.findOne(
        incomeData.CategoryID
      );

      if (category) {
        if (categoryIncomes[category.name]) {
          categoryIncomes[category.name] += Math.abs(incomeData.summa);
        } else {
          categoryIncomes[category.name] = Math.abs(incomeData.summa);
        }
      }
    }

    for (const categoryName in categoryIncomes) {
      const totalExpense = categoryIncomes[categoryName];
      const categoryObject = {
        category: categoryName,
        totalIncome: totalExpense,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }
  @Get('getIncomesByWeek')
  async getIncomesByWeek(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getIncomesByPeriod = await this.rabbitService.getFinancesByWeek(
      user.accountId,
      'income',
      user.groupId
    );

    const categoryIncomes: Record<string, number> = {};
    const resultArray = [];

    for (const incomeData of getIncomesByPeriod) {
      const category = await this.categoryService.findOne(
        incomeData.CategoryID
      );

      if (category) {
        if (categoryIncomes[category.name]) {
          categoryIncomes[category.name] += Math.abs(incomeData.summa);
        } else {
          categoryIncomes[category.name] = Math.abs(incomeData.summa);
        }
      }
    }

    for (const categoryName in categoryIncomes) {
      const totalExpense = categoryIncomes[categoryName];
      const categoryObject = {
        category: categoryName,
        totalIncome: totalExpense,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }
  @Get('getIncomesByMonth')
  async getIncomesByMonth(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getIncomesByPeriod = await this.rabbitService.getFinancesByMonth(
      user.accountId,
      'income',
      user.groupId
    );

    const categoryIncomes: Record<string, number> = {};
    const resultArray = [];

    for (const incomeData of getIncomesByPeriod) {
      const category = await this.categoryService.findOne(
        incomeData.CategoryID
      );

      if (category) {
        if (categoryIncomes[category.name]) {
          categoryIncomes[category.name] += Math.abs(incomeData.summa);
        } else {
          categoryIncomes[category.name] = Math.abs(incomeData.summa);
        }
      }
    }

    for (const categoryName in categoryIncomes) {
      const totalExpense = categoryIncomes[categoryName];
      const categoryObject = {
        category: categoryName,
        totalIncome: totalExpense,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }
  @Get('getIncomesByYear')
  async getIncomesByYear(@Query('chatId') chatId: number) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }

    const getIncomesByPeriod = await this.rabbitService.getFinancesByYear(
      user.accountId,
      'income',
      user.groupId
    );

    const categoryIncomes: Record<string, number> = {};
    const resultArray = [];

    for (const incomeData of getIncomesByPeriod) {
      const category = await this.categoryService.findOne(
        incomeData.CategoryID
      );

      if (category) {
        if (categoryIncomes[category.name]) {
          categoryIncomes[category.name] += Math.abs(incomeData.summa);
        } else {
          categoryIncomes[category.name] = Math.abs(incomeData.summa);
        }
      }
    }

    for (const categoryName in categoryIncomes) {
      const totalExpense = categoryIncomes[categoryName];
      const categoryObject = {
        category: categoryName,
        totalIncome: totalExpense,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }

  @Get('getExpensesByDate')
  async getExpensesByDate(
    @Query('chatId') chatId: number,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string
  ) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }
    const getFinancesByDate = await this.rabbitService.getAccountExpensesByDate(
      user.accountId,
      user.groupId,
      dateFrom,
      dateTo
    );
    const categoryFinances: Record<string, number> = {};
    const resultArray = [];

    for (const financeData of getFinancesByDate) {
      const category = await this.categoryService.findOne(
        financeData.CategoryID
      );

      if (category) {
        if (categoryFinances[category.name]) {
          categoryFinances[category.name] += Math.abs(financeData.summa);
        } else {
          categoryFinances[category.name] = Math.abs(financeData.summa);
        }
      }
    }

    for (const categoryName in categoryFinances) {
      const totalFinance = categoryFinances[categoryName];
      const categoryObject = {
        category: categoryName,
        totalExpense: totalFinance,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }

  @Get('getIncomesByDate')
  async getIncomesByDate(
    @Query('chatId') chatId: number,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string
  ) {
    const user = await this.userService.getByChatId(chatId);
    if (!user) {
      return null;
    }
    const getFinancesByDate = await this.rabbitService.getAccountIncomesByDate(
      user.accountId,
      user.groupId,
      dateFrom,
      dateTo
    );
    const categoryFinances: Record<string, number> = {};
    const resultArray = [];

    for (const financeData of getFinancesByDate) {
      const category = await this.categoryService.findOne(
        financeData.CategoryID
      );

      if (category) {
        if (categoryFinances[category.name]) {
          categoryFinances[category.name] += Math.abs(financeData.summa);
        } else {
          categoryFinances[category.name] = Math.abs(financeData.summa);
        }
      }
    }

    for (const categoryName in categoryFinances) {
      const totalFinance = categoryFinances[categoryName];
      const categoryObject = {
        category: categoryName,
        totalIncome: totalFinance,
      };
      resultArray.push(categoryObject);
    }

    return resultArray;
  }
}
