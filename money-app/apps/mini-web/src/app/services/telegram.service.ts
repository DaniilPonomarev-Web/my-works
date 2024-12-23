import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
}
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}
enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}
export interface ICategory {
  accountId: string;
  groupId: string;
  name: string;
  type: TransactionType;
  status: boolean;
}

export interface IExpensesPeriod {
  category: string;
  totalExpense: number;
  limit?: number;
}
export interface IIncomesPeriod {
  category: string;
  totalIncome: number;
  limit?: number;
}

export interface IGroup {
  id: string;
  name: string;
  accountId: string;
  status: boolean;
}

export interface IUser {
  accountId: string;
  groupId: string;
  chatId: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: boolean;
  role: UserRole;
}
export type UserRole = 'admin' | 'user';
export interface IGroupWithUsers {
  id: string;
  created: string;
  updated: string;
  deleted: string | null;
  deleteRequest: string | null;
  name: string;
  accountId: string;
  status: boolean;
  users: IUser[];
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private window;
  public tgWebApp;
  public tgChat;
  getUserData: any;
  getUserCategories: any;

  constructor(
    @Inject(DOCUMENT) private _document,
    private httpClient: HttpClient
  ) {
    this.window = this._document.defaultView;
    this.tgWebApp = this.window.Telegram.WebApp;
    this.tgChat = this.window.Telegram.WebAppChat;
  }

  get MainButton(): TgButton {
    return this.tgWebApp.MainButton;
  }

  get userDataTelegram(): TelegramUser {
    console.log(environment.apiUrl);

    if (process.env['NODE_ENV'] === 'development') {
      return {
        id: environment.defaultChatId,
        first_name: 'first_name',
        last_name: 'last_name',
        username: 'username',
        language_code: 'ru',
      };
    }

    const user = this.tgWebApp?.initDataUnsafe?.user;
    if (!user) {
      return null;
    }
    return {
      id: user.id || '-',
      first_name: user.first_name || '-',
      last_name: user.last_name || '-',
      username: user.username || '-',
      language_code: user.language_code || '-',
    };
  }

  get userData$(): Observable<boolean> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(false); // Returning false when user is not available
    }
    const getUser = `${environment.apiUrl}/user/info?chatId=${user.id}`;
    return this.httpClient.get<TelegramUser>(getUser).pipe(
      map((data: TelegramUser) => {
        console.log('Data from the backend:', data);
        return data !== null;
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return of(false);
      })
    );
  }

  get userCategories$(): Observable<ICategory[]> {
    const user = this.userDataTelegram;

    if (!user) {
      return of(null);
    }

    const apiUrl = `${environment.apiUrl}/categories/getCategoriesUser?chatId=${user.id}`;
    const getUserApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getUserApi) {
      return of(null);
    }
    return this.httpClient.get<ICategory[]>(apiUrl).pipe(
      catchError((error) => {
        console.error(
          'Ошибка при получении данных категорий пользователя',
          error
        );
        return of(null);
      })
    );
  }

  get userGroups$(): Observable<IGroupWithUsers[]> {
    const user = this.userDataTelegram;

    if (!user) {
      return of(null);
    }

    const apiUrl = `${environment.apiUrl}/groups/getListWithUsers?chatId=${user.id}`;
    const getUserApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getUserApi) {
      return of(null);
    }
    return this.httpClient.get<IGroupWithUsers[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении данных групп пользователя', error);
        return of(null);
      })
    );
  }

  get getExpensesByToday$(): Observable<IExpensesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getExpensesByToday?chatId=${user.id}`;
    const getExpensesByMonthApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getExpensesByMonthApi) {
      return of(null);
    }
    return this.httpClient.get<IExpensesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении трат пользователя', error);
        return of(null);
      })
    );
  }
  get getExpensesByWeek$(): Observable<IExpensesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getExpensesByWeek?chatId=${user.id}`;
    const getExpensesByMonthApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getExpensesByMonthApi) {
      return of(null);
    }
    return this.httpClient.get<IExpensesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении трат пользователя', error);
        return of(null);
      })
    );
  }
  get getExpensesByMonth$(): Observable<IExpensesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/expensesMonth?chatId=${user.id}`;
    const getExpensesByMonthApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getExpensesByMonthApi) {
      return of(null);
    }
    return this.httpClient.get<IExpensesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении трат пользователя', error);
        return of(null);
      })
    );
  }
  get getExpensesByYear$(): Observable<IExpensesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getExpensesByYear?chatId=${user.id}`;
    const getExpensesByMonthApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getExpensesByMonthApi) {
      return of(null);
    }
    return this.httpClient.get<IExpensesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении трат пользователя', error);
        return of(null);
      })
    );
  }

  get getIncomesByToday$(): Observable<IIncomesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getIncomesByToday?chatId=${user.id}`;
    const getIncomesByToday = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getIncomesByToday) {
      return of(null);
    }
    return this.httpClient.get<IIncomesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении доходов пользователя', error);
        return of(null);
      })
    );
  }
  get getIncomesByWeek$(): Observable<IIncomesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getIncomesByWeek?chatId=${user.id}`;
    const getIncomesByWeek = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getIncomesByWeek) {
      return of(null);
    }
    return this.httpClient.get<IIncomesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении доходов пользователя', error);
        return of(null);
      })
    );
  }
  get getIncomesByMonth$(): Observable<IIncomesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getIncomesByMonth?chatId=${user.id}`;
    const getExpensesByMonthApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getExpensesByMonthApi) {
      return of(null);
    }
    return this.httpClient.get<IIncomesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении доходов пользователя', error);
        return of(null);
      })
    );
  }
  get getIncomesByYear$(): Observable<IIncomesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getIncomesByYear?chatId=${user.id}`;
    const getIncomesByYearApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getIncomesByYearApi) {
      return of(null);
    }
    return this.httpClient.get<IIncomesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении доходов пользователя', error);
        return of(null);
      })
    );
  }

  getExpensesByDate$(
    dateFrom: string,
    dateTo: string
  ): Observable<IExpensesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getExpensesByDate?chatId=${user.id}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const getIncomesByYearApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getIncomesByYearApi) {
      return of(null);
    }
    return this.httpClient.get<IExpensesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении финансов пользователя', error);
        return of(null);
      })
    );
  }
  getIncomesByDate$(
    dateFrom: string,
    dateTo: string
  ): Observable<IIncomesPeriod[]> {
    const user = this.userDataTelegram;
    if (!user) {
      return of(null);
    }
    const apiUrl = `${environment.apiUrl}/finances/getIncomesByDate?chatId=${user.id}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const getIncomesByYearApi = this.httpClient.get<TelegramUser>(apiUrl);
    if (!getIncomesByYearApi) {
      return of(null);
    }
    return this.httpClient.get<IIncomesPeriod[]>(apiUrl).pipe(
      catchError((error) => {
        console.error('Ошибка при получении финансов пользователя', error);
        return of(null);
      })
    );
  }

  async getUserApi(chatId: number) {
    const apiUrl = `${environment.apiUrl}/user/info?chatId=${chatId}`;
    const user = this.httpClient.get<TelegramUser>(apiUrl);
    if (!user) {
      return null;
    }
    return user;
  }
}

// get chatId() {
//   const chatId = this.tgWebApp?.initDataUnsafe?.user?.id;
//   if (!chatId) {
//     return '-';
//   }
//   return chatId;
// }

// get firstName() {
//   const firstName = this.tgWebApp?.initDataUnsafe?.user?.first_name;
//   if (!firstName) {
//     return '-';
//   }
//   return firstName;
// }

// get lastName() {
//   const last_name = this.tgWebApp?.initDataUnsafe?.user?.last_name;
//   if (!last_name) {
//     return '-';
//   }
//   return last_name;
// }

// get username() {
//   const username = this.tgWebApp?.initDataUnsafe?.user?.username;
//   if (!username) {
//     return '-';
//   }
//   return username;
// }

// get languageCode() {
//   const language_code = this.tgWebApp?.initDataUnsafe?.user?.language_code;
//   if (!language_code) {
//     return '-';
//   }
//   return language_code;
// }
