import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import {
  ICategory,
  IExpensesPeriod,
  TelegramService,
  TelegramUser,
} from '../../../../services/telegram.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'money-app-my-expenses-pie',
  standalone: true,
  imports: [NgChartsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './my-expenses-pie.component.html',
  styleUrl: '../my-expenses.component.css',
})
export class MyExpensesPieComponent {
  userDataTelegram: TelegramUser;
  userCategories$: ICategory[];
  labels: string[] = [];
  date = false;
  userExpensesByMonth$: IExpensesPeriod[];
  dateForm: FormGroup;
  periodExpense: boolean;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public telegramService: TelegramService
  ) {
    this.dateForm = this.formBuilder.group({
      dateFrom: '',
      dateTo: '',
    });
    this.updateChartData('day'); // Начальная загрузка данных за сегодняшний день
  }

  public updateChartData(period: 'day' | 'week' | 'month' | 'year'): void {
    let apiMethod: Observable<IExpensesPeriod[]>;
    this.date = false;
    this.periodExpense = false;

    switch (period) {
      case 'day':
        this.periodExpense = false;
        apiMethod = this.telegramService.getExpensesByToday$;
        break;
      case 'week':
        this.periodExpense = false;
        apiMethod = this.telegramService.getExpensesByWeek$;
        break;
      case 'month':
        this.periodExpense = true;
        apiMethod = this.telegramService.getExpensesByMonth$;
        break;
      case 'year':
        this.periodExpense = false;
        apiMethod = this.telegramService.getExpensesByYear$;
        break;
      default:
        console.error('Invalid period:', period);
        return;
    }

    apiMethod.subscribe((expenses) => {
      console.log(expenses);
      if (expenses) {
        this.userExpensesByMonth$ = expenses;
        this.labels = expenses.map((expense) => expense.category);
        this.updateChart(); // Вызываем метод для обновления графика
      } else {
        console.log('Не удалось получить данные категорий пользователя');
      }
    });
  }

  public getDataInputs(): void {
    this.periodExpense = false;

    // this.date = false; // Скрываем поля выбора даты
    const dateFrom = this.dateForm.get('dateFrom').value;
    const dateTo = this.dateForm.get('dateTo').value;
    // Отправляем запрос на получение данных о расходах за указанный период времени
    this.telegramService
      .getExpensesByDate$(dateFrom, dateTo)
      .subscribe((expenses) => {
        console.log(expenses);
        if (expenses) {
          this.userExpensesByMonth$ = expenses;
          this.labels = expenses.map((expense) => expense.category);
          this.updateChart(); // Вызываем метод для обновления графика
        } else {
          console.log(
            'Не удалось получить данные о расходах за выбранный период'
          );
        }
      });
  }

  private updateChart(): void {
    this.pieChartData.labels = this.labels;
    this.pieChartData.datasets[0].data = this.calculateData();
    if (this.chart) {
      this.chart.update(); // Обновляем график
    }
  }

  private calculateData(): number[] {
    return this.userExpensesByMonth$.map((expense) =>
      Math.abs(expense.totalExpense)
    );
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        display: false, // Установите в false, чтобы отключить текст внутри секторов
      },
      // datalabels: {
      //   formatter: (value: any, ctx: any) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //   },
      // },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public calculateTotalExpense(): number {
    if (!this.userExpensesByMonth$ || this.userExpensesByMonth$.length === 0) {
      return 0;
    }

    return this.userExpensesByMonth$.reduce(
      (total, expense) => total + expense.totalExpense,
      0
    );
  }
}
