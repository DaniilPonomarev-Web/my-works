import { Component } from '@angular/core';
import { TelegramService, TelegramUser } from '../../services/telegram.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'money-app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  name = '';
  userDataTelegram: TelegramUser;

  constructor(public telegramService: TelegramService, private router: Router) {
    this.userDataTelegram = this.telegramService.userDataTelegram;
    this.name = this.userDataTelegram.first_name;
  }

  navigateToMyExpenses() {
    this.router.navigate(['/my-expenses']);
  }
  navigateToMyIncomes() {
    this.router.navigate(['/my-incomes']);
  }

  navigateToGroupsExpenses() {
    this.router.navigate(['/groups']);
  }
  navigateToUsersExpenses() {
    this.router.navigate(['/user-expenses']);
  }

  navigateToAboutUser() {
    this.router.navigate(['/about-user']);
  }
}
