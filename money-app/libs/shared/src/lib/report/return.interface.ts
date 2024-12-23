interface timesForDashboard {
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface DashboardReport {
  /**
   * Расходы
   */
  expenses: timesForDashboard;
  /**
   * Доходы
   */
  income: timesForDashboard;
}

/*Покупки за месяц */
export interface MonthlyExpenseResponse {
  meta: {
    name: string;
    type: string;
  }[];
  data: {
    CategoryID: string;
    summa: number;
  }[];
  rows: number;
  statistics: {
    elapsed: number;
    rows_read: number;
    bytes_read: number;
  };
}
export interface ExpenseDataWithCategory {
  CategoryID: string;
  summa: number;
}

export interface IFinacesByDateWithCategory {
  CategoryID: string;
  summa: number;
}