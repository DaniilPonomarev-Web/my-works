import { Component } from '@angular/core';
import { Observable, interval, take } from 'rxjs';
import { TelegramService, TelegramUser } from '../../services/telegram.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'money-app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  userData$: Observable<boolean>;
  loadingText = 'Идет загрузка Ваших данных';
  loadingColor = 'burlywood';
  loadingImage = '../../../assets/img/ticks.gif';
  name = '';
  userDataTelegram: TelegramUser;

  constructor(public telegramService: TelegramService, private router: Router) {
    this.userDataTelegram = this.telegramService.userDataTelegram;
    this.name = this.userDataTelegram.first_name;

    this.startTextChanging();
    this.userData$ = this.telegramService.userData$;
    this.userData$.subscribe(
      (userData) => {
        if (!userData) {
          setTimeout(() => {
            this.loadingText = `Вас нет в системе. Пройдите регистрацию в боте. `;
            this.loadingImage = '../../../assets/img/404-2.gif';
          }, 4500);
          return;
        }
        setTimeout(() => {
          this.navigateToGraphs();
        }, 5300);
      },
      (error) => {
        console.error('Ошибка при получении данных пользователя', error);
      }
    );
  }

  startTextChanging() {
    let count = 0;
    const textChanges = ['Авторизация', 'Ещё чуть-чуть', `Готово! `];
    const imageChanges = [
      '../../../assets/img/ticks.gif',
      '../../../assets/img/ticks2.gif',
      '../../../assets/img/ticks3.gif',
    ];

    interval(1500)
      .pipe(take(textChanges.length))
      .subscribe(() => {
        this.loadingText = textChanges[count];
        this.loadingImage = imageChanges[count];
        this.changeLoadingColor();
        count++;
      });
  }
  // Метод для изменения цвета
  private changeLoadingColor() {
    this.loadingColor = this.getRandomColor();
  }

  // Метод для генерации случайного цвета (простой пример)
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  navigateToGraphs() {
    this.router.navigate(['/home']);
  }
}
