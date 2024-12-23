import { Account, AccountType } from '@money-app/entities';
import dayjs = require('dayjs');
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>
  ) {}

  /**
   * Создать аккаунт
   * @param type Тип аккаунта
   * @returns
   */
  async create(key: number, type: AccountType) {
    const res = await this.accountRepo
      .createQueryBuilder()
      .insert()
      .values({
        key,
        type,
        registred: dayjs().toDate(),
      })
      .returning('*')
      .execute();

    return res?.raw[0] ?? null;
  }

  /*
   * Получить аккаунт по chatID
   */

  async getAccountId(key: number) {
    const account = await this.accountRepo
      .createQueryBuilder()
      .select('account.id')
      .from(Account, 'account')
      .where('account.key = :key', { key })
      .getOne();

    if (!account) {
      return null;
    }
    return account.id;
  }

  /*
   * Получить аккаунт по chatID
   */

  async getAllAccountsId() {
    const currentDate = new Date();
    const accounts = await this.accountRepo
      .createQueryBuilder()
      .select(['account.id', 'account.key'])
      .from(Account, 'account')
      .where('account.subscribe >= :currentDate', { currentDate })
      .andWhere(
        `CAST(account.setting AS JSON)->>'remindersEnabled' = :remindersEnabled`,
        { remindersEnabled: '1' }
      )
      .getMany();

    if (!accounts) {
      return null;
    }
    return accounts;
  }

  async getAccountById(id: string) {
    const account = await this.accountRepo
      .createQueryBuilder()
      .where('id = :id', { id }) // Используем просто 'id', так как мы находимся в контексте сущности Account
      .getOne();

    if (!account) {
      return null;
    }
    return account;
  }

  async getAccountsSubscribeTomorrow(tomorrow: string) {
    const accounts = await this.accountRepo
      .createQueryBuilder('account')
      .select('account.key')
      .where('account.subscribe = :tomorrow', { tomorrow })
      .getMany();

    const accountKeys = accounts.map((account) => account.key);
    return accountKeys;
  }

  /*
   *Включаем или отключаем напоминание о покупках
   */

  async editRemindersInfo(accountId: string) {
    const account = await this.getAccountById(accountId);
    console.warn(account);
    if (!account) {
      return false;
    }

    const accountSettings = account.setting;
    const settingsObject = JSON.parse(accountSettings);
    const remindersInfoValue = settingsObject.remindersEnabled;

    console.warn(settingsObject);
    const newObject = {
      ...settingsObject,
      remindersEnabled: remindersInfoValue == 1 ? 0 : 1,
    };

    const save = this.accountRepo.update(accountId, {
      setting: newObject,
    });

    return true;
  }

  /**
   * Обновить дату подписки аккаунта на один месяц от текущей даты
   * @param accountId ID аккаунта
   * @param duration время продления подписки
   * @returns Обновленный аккаунт или null, если аккаунт не найден
   */
  async updateSubscriptionDate(
    accountId: string,
    duration: string
  ): Promise<boolean> {
    // Находим аккаунт по ID
    const account = await this.getAccountById(accountId);
    if (!account) {
      return false;
    }

    // Определяем количество времени для продления подписки
    let addedTime: number;
    switch (duration) {
      case 'month':
        addedTime = 1;
        break;
      case 'threeMonth':
        addedTime = 3;
        break;
      case 'halfAyear':
        addedTime = 6;
        break;
      case 'year':
        addedTime = 12;
        break;
      default:
        addedTime = 2;
    }

    // Добавляем один месяц к текущей дате подписки
    const newSubscriptionDate = dayjs(account.subscribe)
      .add(addedTime, 'month')
      .toDate();

    // Обновляем дату подписки аккаунта в базе данных
    await this.accountRepo.update(accountId, {
      subscribe: newSubscriptionDate,
    });

    return true;
  }
}
