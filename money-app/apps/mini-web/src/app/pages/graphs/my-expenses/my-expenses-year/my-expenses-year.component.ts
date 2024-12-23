import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import Annotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'money-app-my-expenses-year',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './my-expenses-year.component.html',
  styleUrl: '../my-expenses.component.css',
})
export class MyExpensesYearComponent {
  constructor() {
    Chart.register(Annotation);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 50, 50, 50, 50, 50],
        label: '2022',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [75, 69, 90, 91, 76, 65, 60, 60, 60, 60, 60, 60],
        label: '2023',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [95, 69, 101, 111, 96, 95, 90, 70, 70, 70, 70, 70],
        label: '2024',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    // scales: {
    //   // We use this empty structure as a placeholder for dynamic theming.
    //   y: {
    //     position: 'left',
    //   },
    //   y1: {
    //     position: 'right',
    //     grid: {
    //       color: 'rgba(255,0,0,0.3)',
    //     },
    //     ticks: {
    //       color: 'red',
    //     },
    //   },
    // },

    plugins: {
      legend: { display: true },
      //   annotation: {
      //     annotations: [
      //       {
      //         type: 'line',
      //         scaleID: 'x',
      //         value: 'annotations',
      //         borderColor: 'orange',
      //         borderWidth: 2,
      //         label: {
      //           display: true,
      //           position: 'center',
      //           color: 'orange',
      //           content: 'LineAnno',
      //           font: {
      //             weight: 'bold',
      //           },
      //         },
      //       },
      //     ],
      //   },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 100000) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] =
          MyExpensesYearComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }
}
