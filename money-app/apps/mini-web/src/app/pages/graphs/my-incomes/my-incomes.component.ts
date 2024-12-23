import { Component, ViewChild } from '@angular/core';
import { TelegramService } from '../../../services/telegram.service';
import { MyIncomesPieComponent } from './my-incomes-pie/my-incomes-pie.component';
import { Router } from '@angular/router';

@Component({
  selector: 'money-app-my-incomes',
  standalone: true,
  imports: [MyIncomesPieComponent],
  // templateUrl: './my-expenses.component.html',
  template: `
    <div class="container">
      <a class="button" (click)="navigateToHome()" ariaCurrentWhenActive="page">
        ← Назад
      </a>
      <div class="graphs">
        <money-app-my-expenses-pie></money-app-my-expenses-pie>
      </div>
    </div>
  `,
  styleUrl: './my-incomes.component.css',
})
export class MyIncomesComponent {
  @ViewChild(MyIncomesPieComponent) viewChildPie: MyIncomesPieComponent;

  constructor(
    public telegramService: TelegramService,
    private router: Router
  ) {}
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
