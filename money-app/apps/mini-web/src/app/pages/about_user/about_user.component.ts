import { Component } from '@angular/core';
import { TelegramService, TelegramUser } from '../../services/telegram.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'money-app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './about_user.component.html',
  styleUrl: './about_user.component.css',
})
export class AboutUserComponent {
  name = '';
  userDataTelegram: TelegramUser;

  constructor(public telegramService: TelegramService, private router: Router) {
    this.userDataTelegram = this.telegramService.userDataTelegram;
    console.log(this.userDataTelegram);

    this.name = this.userDataTelegram.first_name;
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
