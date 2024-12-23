import { CustomerRole } from '../../types';

export interface ICustomer {
  id: string; // id
  login: string; // login
  email: string; // Почтовый адрес
  role: CustomerRole; // Роль
  password: string; // Пароль
  lastLogin: Date; // Дата последней авторизации
}

export interface ICustomerWithoutPass {
  id: string;
  login: string;
  email: string;
  role: CustomerRole;
  lastLogin: Date; // Дата последней авторизации
}

export interface ICustomersResult {
  customers: ICustomerWithoutPass[];
  total: number;
}

export interface ICreateCustomer {
  login: string; // login
  password: string; // Пароль
  email: string; // Почтовый адрес
  role: CustomerRole; // Роль
}

export interface IUpdateCustomer {
  id: string;
  login: string;
  email: string;
  role: CustomerRole;
  password: string; // Пароль
}
