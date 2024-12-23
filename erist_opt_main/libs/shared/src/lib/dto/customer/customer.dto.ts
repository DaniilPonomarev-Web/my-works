import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  ICreateCustomer,
  ICustomersResult,
  ICustomerWithoutPass,
  IUpdateCustomer,
} from '../../interfaces';
import { CustomerRole } from '../../types';
import { IsOptional } from 'class-validator';

@ObjectType({ description: 'Пользователь админки' })
export class CustomerDTO implements ICustomerWithoutPass {
  @Field(() => ID, { nullable: false, description: 'ID пользователя' })
  id: string;

  @Field({
    nullable: false,
    description: 'Логин пользователя',
  })
  login: string;

  @Field({ nullable: false, description: 'Почта' })
  email: string;

  @Field(() => CustomerRole, {
    nullable: false,
    description: 'Роль пользователя',
  })
  role: CustomerRole;

  @Field({ nullable: true, description: 'Последняя авторизация' })
  lastLogin: Date;

  constructor(
    id: string,
    login: string,
    role: CustomerRole,
    email: string,
    lastLogin: Date
  ) {
    this.id = id;
    this.login = login;
    this.role = role;
    this.email = email;
    this.lastLogin = lastLogin;
  }
}

@InputType({ description: 'Создание пользователя админки' })
export class CreateCustomerDTO implements ICreateCustomer {
  @IsOptional()
  @Field({
    nullable: false,
    description: 'Логин пользователя',
  })
  login: string;

  @IsOptional()
  @Field({ nullable: false, description: 'Почта' })
  email: string;

  @IsOptional()
  @Field({ nullable: false, description: 'Пароль ' })
  password: string;

  @IsOptional()
  @Field(() => CustomerRole, { description: 'Роль пользователя' })
  role: CustomerRole;

  constructor(
    login: string,
    role: CustomerRole,
    password: string,
    email: string
  ) {
    this.login = login;
    this.role = role;
    this.password = password;
    this.email = email;
  }
}

@InputType({ description: 'Обновление пользователя админки' })
export class UpdateCustomerDTO implements IUpdateCustomer {
  @IsOptional()
  @Field({
    nullable: false,
    description: 'id пользователя',
  })
  id: string;
  @IsOptional()
  @Field({
    nullable: false,
    description: 'Логин пользователя',
  })
  login: string;

  @IsOptional()
  @Field({ nullable: false, description: 'Почта' })
  email: string;

  @IsOptional()
  @Field(() => CustomerRole, { description: 'Роль пользователя' })
  role: CustomerRole;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Пароль Если задан то новый, если нет, то старый',
  })
  password: string;

  constructor(
    id: string,
    login: string,
    role: CustomerRole,
    email: string,
    password: string
  ) {
    this.id = id;
    this.login = login;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}

@ObjectType({ description: 'Пользователи админки сайта' })
export class CustomersResultDTO implements ICustomersResult {
  @Field(() => [CustomerDTO], {
    nullable: true,
    description: 'Информация о Customers',
  })
  customers: CustomerDTO[];

  @Field(() => Float, {
    nullable: true,
    description: 'Общее количество Customers',
  })
  total: number;

  constructor(customers: CustomerDTO[], total: number) {
    this.customers = customers;
    this.total = total;
  }
}

@InputType({ description: 'Инпут для фильтров пользователей админки' })
export class CustomersFilterAdminDTO {
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
    description: 'фильтр по логину',
  })
  filterLogin: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по  email',
  })
  filterEmail: string;

  constructor(filterLogin: string, filterEmail: string) {
    this.filterLogin = filterLogin;
    this.filterEmail = filterEmail;
  }
}
