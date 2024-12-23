import { ICreateAddress, IUserAddress } from './user_address.interface';
import { IUserAgreement } from './user_agreement.interface';
import { IUpdateCompany, IUserCompany } from './user_company.interface';

/**
 * Интерфейс для представления информации о пользователе.
 */
export interface IUser {
  id: string; // Уникальный идентификатор пользователя
  status: boolean; // Статус пользователя
  name: string; // Имя компании или имя и фамилия контактного лица
  email: string; // Почтовый адрес
  phone: string; // Номер телефона
  password: string; // Пароль
  secondPassword?: string; // Второй пароль (необязательный)
  registrationDate: Date; // Дата регистрации
  lastLogin: Date | null; // Дата последней авторизации
  company: IUserCompany; // Данные компании
  // addresses: IUserAddress[]; // Адреса доставки
  agreement: IUserAgreement; //договор пользователя
}

/**
 * Интерфейс для представления информации о пользователе без пароля.
 */
export interface IUserWithoutPass {
  id: string; // Уникальный идентификатор пользователя
  status: boolean; // Статус пользователя
  name: string; // Имя компании или имя и фамилия контактного лица
  email: string; // Почтовый адрес
  phone: string; // Номер телефона
  registrationDate: Date; // Дата регистрации
  lastLogin: Date | null; // Дата последней авторизации
  company: IUserCompany; // Данные компании
  // addresses: IUserAddress[]; // Адреса доставки
  agreement: IUserAgreement; //договор пользователя
}

/**
 * Интерфейс для представления информации о пользователе для заказа.
 */
export interface IUserForOrder {
  id: string; // Уникальный идентификатор пользователя
  status: boolean; // Статус пользователя
  name: string; // Имя компании или имя и фамилия контактного лица
  phone: string; // Номер телефона
  email: string; // Почтовый адрес
}

/**
 * Интерфейс для представления результата запроса пользователей.
 */
export interface IUsersResult {
  users: IUser[]; // Массив пользователей
  total: number; // Общее количество пользователей
}

/**
 * Интерфейс для создания нового пользователя.
 */
export interface ICreateUser {
  name: string; // Имя компании или имя и фамилия контактного лица
  phone: string; // Номер телефона
  email: string; // Почтовый адрес
  password: string; // Пароль
  secondPassword?: string; // Второй пароль (необязательный)
  company: IUpdateCompany; // Данные компании
  // addresses: ICreateAddress[]; // Адреса доставки
}

export interface IUpdateUser {
  name: string;
  phone: string;
  status: boolean;
}

export interface IUpdateUserForAdmin {
  id: string;
  name: string;
  phone: string;
  status: boolean;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IUserDataForResetPassword {
  email: string;
  code: number;
}
