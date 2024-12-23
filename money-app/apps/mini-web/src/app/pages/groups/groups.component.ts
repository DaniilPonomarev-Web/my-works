import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGroupWithUsers,
  TelegramService,
  TelegramUser,
} from '../../services/telegram.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'money-app-graphs',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  userDataTelegram: TelegramUser;
  userGroups$: Observable<IGroupWithUsers[]>;

  constructor(
    public telegramService: TelegramService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userGroups$ = this.telegramService.userGroups$.pipe(
      map((groups) => {
        if (Array.isArray(groups)) {
          return groups.map((group) => {
            return {
              ...group,
              users: group.users || [], // Если нет пользователей, устанавливаем пустой массив
            };
          });
        } else {
          // Если groups не является массивом, возвращаем его как есть
          return [groups];
        }
      })
    );
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
