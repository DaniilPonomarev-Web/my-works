import { Component, ViewChild } from '@angular/core';
import { TelegramService } from '../../../services/telegram.service';
import { MyExpensesYearComponent } from './my-expenses-year/my-expenses-year.component';
import { MyExpensesPieComponent } from './my-expenses-pie/my-expenses-pie.component';
import { Router } from '@angular/router';

@Component({
  selector: 'money-app-my-expenses',
  standalone: true,
  imports: [MyExpensesYearComponent, MyExpensesPieComponent],
  // templateUrl: './my-expenses.component.html',
  template: `
    <div class="container">
      <a class="button" (click)="navigateToHome()" ariaCurrentWhenActive="page">
        ← Назад
      </a>
      <div class="graphs">
        <money-app-my-expenses-year></money-app-my-expenses-year>
        <money-app-my-expenses-pie></money-app-my-expenses-pie>
      </div>
    </div>
  `,
  styleUrl: './my-expenses.component.css',
})
export class MyExpensesComponent {
  @ViewChild(MyExpensesYearComponent) viewChildYer: MyExpensesYearComponent;
  @ViewChild(MyExpensesPieComponent) viewChildPie: MyExpensesPieComponent;

  constructor(
    public telegramService: TelegramService,
    private router: Router
  ) {}
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
