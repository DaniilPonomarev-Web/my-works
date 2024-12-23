import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import {
  ICategory,
  IIncomesPeriod,
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
  templateUrl: './my-incomes-pie.component.html',
  styleUrl: './my-incomes.component.css',
})
export class MyIncomesPieComponent {
  userDataTelegram: TelegramUser;
  userCategories$: ICategory[];
  labels: string[] = [];
  userIncomesByPreiod$: IIncomesPeriod[];
  date = false;
  dateForm: FormGroup;

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
    let apiMethod: Observable<IIncomesPeriod[]>;
    this.date = false;
    switch (period) {
      case 'day':
        apiMethod = this.telegramService.getIncomesByToday$;
        break;
      case 'week':
        apiMethod = this.telegramService.getIncomesByWeek$;
        break;
      case 'month':
        apiMethod = this.telegramService.getIncomesByMonth$;
        break;
      case 'year':
        apiMethod = this.telegramService.getIncomesByYear$;
        break;
      default:
        console.error('Invalid period:', period);
        return;
    }

    apiMethod.subscribe((incomes) => {
      console.log(incomes);
      if (incomes) {
        this.userIncomesByPreiod$ = incomes;
        this.labels = incomes.map((income) => income.category);
        this.updateChart(); // Вызываем метод для обновления графика
      } else {
        console.log('Не удалось получить данные категорий пользователя');
      }
    });
  }

  public getDataInputs(): void {
    // this.date = false; // Скрываем поля выбора даты
    const dateFrom = this.dateForm.get('dateFrom').value;
    const dateTo = this.dateForm.get('dateTo').value;
    // Отправляем запрос на получение данных о расходах за указанный период времени
    this.telegramService
      .getIncomesByDate$(dateFrom, dateTo)
      .subscribe((incomes) => {
        console.log(incomes);
        if (incomes) {
          this.userIncomesByPreiod$ = incomes;
          this.labels = incomes.map((income) => income.category);
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
    return this.userIncomesByPreiod$.map((expense) =>
      Math.abs(expense.totalIncome)
    );
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        display: false, // Установите в false, чтобы отключить текст внутри секторов
      },
      // datalabels: {
      //   formatter: (value: any, ctx: any) => {
      //     // if (ctx.chart.data.labels) {
      //     //   return ctx.chart.data.labels[ctx.dataIndex];
      //     // }
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
    if (!this.userIncomesByPreiod$ || this.userIncomesByPreiod$.length === 0) {
      return 0;
    }

    return this.userIncomesByPreiod$.reduce(
      (total, expense) => total + expense.totalIncome,
      0
    );
  }
}
