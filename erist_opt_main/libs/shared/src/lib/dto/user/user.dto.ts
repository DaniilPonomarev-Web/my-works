import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  IChangePassword,
  ICreateUser,
  IUpdateUser,
  IUpdateUserForAdmin,
  IUser,
  IUserForOrder,
  IUsersResult,
  IUserWithoutPass,
} from '../../interfaces';
import { UserCompanyDTO, UserCompanyInputDTO } from './user_company.dto';
// import { UserAddressDTO, UserAddressInputDTO } from './user_address.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { variablesForUser } from '../../variables';
import { PasswordMatch } from '../../validation-custom';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';
import { Type } from 'class-transformer';
import { UserAgreementDTO } from './user_agreement.dto';

@ObjectType({ description: 'Пользователь' })
export class UserDTO implements IUserWithoutPass {
  @Field(() => ID, { description: 'ID пользователя' })
  id: string;

  @Field(() => Boolean, {
    description: 'Статус пользователя',
  })
  status: boolean;

  @Field({
    description: 'Наименование компании или имя и фамилия контактного лица',
  })
  name: string;

  @Field({ description: 'Номер телфона' })
  phone: string;

  @Field({ description: 'Почта' })
  email: string;

  @Field({ description: 'Дата регистрации' })
  registrationDate: Date;

  @Field({ nullable: true, description: 'Последняя авторизация' })
  lastLogin: Date | null;

  @Field(() => UserCompanyDTO, { description: 'Компания пользователя' })
  company: UserCompanyDTO;

  // @Field(() => [UserAddressDTO], { description: 'Адреса пользователя' })
  // addresses: UserAddressDTO[];

  @Field(() => UserAgreementDTO, {
    description: 'Договор пользователя',
    nullable: true,
  })
  agreement: UserAgreementDTO;

  constructor(
    id: string,
    status: boolean,
    name: string,
    phone: string,
    email: string,
    registrationDate: Date,
    lastLogin: Date | null,
    company: UserCompanyDTO,
    // addresses: UserAddressDTO[],
    agreement: UserAgreementDTO
  ) {
    this.id = id;
    this.status = status;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.registrationDate = registrationDate;
    this.lastLogin = lastLogin;
    this.company = company;
    // this.addresses = addresses;
    this.agreement = agreement;
  }
}

@ObjectType({ description: 'Пользователи магазина' })
export class UsersResultsDTO implements IUsersResult {
  @Field(() => [UserDTO], {
    nullable: true,
    description: 'Информация о пользователях',
  })
  users: IUser[];

  @Field(() => Float, {
    nullable: true,
    description: 'Общее количество пользователей',
  })
  total: number;

  constructor(users: IUser[], total: number) {
    this.users = users;
    this.total = total;
  }
}

@InputType({ description: 'Входные данные для создания пользователя' })
export class SignUpUserInputDTO implements ICreateUser {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.name.notName,
  })
  @Length(1, variablesForUser.signUpUser.name.max, {
    message: HttpExceptionMessagesGraphQL.valiadtions.name.maxLenght,
  })
  @Field({ description: 'Имя контактного лица' })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notPhone,
  })
  @IsPhoneNumber('RU', {
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notValid,
  })
  @Field(() => String, { description: 'Номер телефона' })
  phone: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.email.notEmail,
  })
  @IsEmail(
    {},
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.email.emailCorrect,
    }
  )
  @Field({ description: 'Почта' })
  email: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.password.notPassword,
  })
  @Length(
    variablesForUser.signUpUser.password.min,
    variablesForUser.signUpUser.password.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.password.length,
    }
  )
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.password.strong,
    }
  )
  @Field({ description: 'Пароль' })
  password: string;

  @IsNotEmpty({
    message:
      HttpExceptionMessagesGraphQL.valiadtions.password.notSecondPassword,
  })
  @PasswordMatch('password', {
    message: 'Пароли не совпадают',
  })
  @Field({ description: 'Повтор пароля' })
  secondPassword: string;

  @ValidateNested()
  @Type(() => UserCompanyInputDTO)
  @Field(() => UserCompanyInputDTO, { description: 'Компания пользователя' })
  company: UserCompanyInputDTO;

  // @ValidateNested({ each: true })
  // @Type(() => UserAddressInputDTO)
  // @Field(() => [UserAddressInputDTO], { description: 'Адреса пользователя' })
  // addresses: UserAddressInputDTO[];

  constructor(
    name: string,
    phone: string,
    email: string,
    password: string,
    secondPassword: string,
    company: UserCompanyInputDTO
    // addresses: UserAddressInputDTO[]
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.secondPassword = secondPassword;
    this.company = company;
    // this.addresses = addresses;
  }
}

@InputType()
export class UpdateUserDto implements IUpdateUser {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notPhone,
  })
  @MaxLength(variablesForUser.signUpUser.name.max, {
    message: HttpExceptionMessagesGraphQL.valiadtions.name.maxLenght,
  })
  @Field({ description: 'Имя контактного лица', nullable: false })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.status.notStatus,
  })
  @Field({ nullable: false })
  status: boolean;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notPhone,
  })
  @IsPhoneNumber('RU', {
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notValid,
  })
  @Field({ nullable: false })
  phone: string;

  constructor(name: string, status: boolean, phone: string) {
    this.name = name;
    this.status = status;
    this.phone = phone;
  }
}

@InputType()
export class UpdateUserForAdminDto implements IUpdateUserForAdmin {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.user.notUserId,
  })
  @Field({ description: 'ID', nullable: false })
  id: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notPhone,
  })
  @MaxLength(variablesForUser.signUpUser.name.max, {
    message: HttpExceptionMessagesGraphQL.valiadtions.name.maxLenght,
  })
  @Field({ description: 'Имя контактного лица', nullable: false })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.status.notStatus,
  })
  @Field({ nullable: false })
  status: boolean;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notPhone,
  })
  @IsPhoneNumber('RU', {
    message: HttpExceptionMessagesGraphQL.valiadtions.phone.notValid,
  })
  @Field({ nullable: false })
  phone: string;

  constructor(name: string, id: string, status: boolean, phone: string) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.phone = phone;
  }
}

@InputType()
export class ChangePasswordDto implements IChangePassword {
  @IsNotEmpty({
    message:
      HttpExceptionMessagesGraphQL.valiadtions.oldPassword.nototOldPassword,
  })
  @Field(() => String, { description: 'Текущий пароль пользователя' })
  currentPassword: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.notPassword,
  })
  @MinLength(variablesForUser.signUpUser.password.min, {
    message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.minLength,
  })
  @MaxLength(variablesForUser.signUpUser.password.max, {
    message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.maxLength,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.strong,
    }
  )
  @Field(() => String, { description: 'Новый пароль пользователя' })
  newPassword: string;

  constructor(currentPassword: string, newPassword: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}

@ObjectType({ description: 'Пользователь' })
export class UserDTOForOrder implements IUserForOrder {
  @Field(() => ID, { description: 'ID пользователя' })
  id: string;

  @Field(() => Boolean, {
    description: 'Статус пользователя',
  })
  status: boolean;

  @Field({
    description: 'Наименование компании или имя и фамилия контактного лица',
  })
  name: string;

  @Field({ description: 'Номер телфона' })
  phone: string;

  @Field({ description: 'Почта' })
  email: string;

  constructor(
    id: string,
    status: boolean,
    name: string,
    phone: string,
    email: string
  ) {
    this.id = id;
    this.status = status;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

@InputType({ description: 'Инпут для фильтров списка пользователей магазина' })
export class UsersFilterAdminDTO {
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
    description: 'фильтр по статусу',
  })
  filterStatus: boolean;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по части Имени ',
  })
  filterName: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по части номера телефона',
  })
  filterPhone: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по  email',
  })
  filterEmail: string;

  constructor(
    filterStatus: boolean,
    filterName: string,
    filterPhone: string,
    filterEmail: string
  ) {
    this.filterStatus = filterStatus;
    this.filterName = filterName;
    this.filterPhone = filterPhone;
    this.filterEmail = filterEmail;
  }
}

@InputType({
  description: 'Входные данные для восстановления пароля пользователя',
})
export class ResetPasswordInputDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.email.notEmail,
  })
  @IsEmail(
    {},
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.email.emailCorrect,
    }
  )
  @Field({ description: 'email человека' })
  email: string;
}

@InputType({
  description: 'Код для восстановления пароля пользователя',
})
export class CodeForResetPasswordInputDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.email.notEmail,
  })
  @IsEmail(
    {},
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.email.emailCorrect,
    }
  )
  @Field({ description: 'email человека' })
  email: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.code.not,
  })
  @Field({ description: 'код отправленный в письме' })
  code: number;
}

@InputType()
export class newUserPasswordInputDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.email.notEmail,
  })
  @IsEmail(
    {},
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.email.emailCorrect,
    }
  )
  @Field({ description: 'email человека' })
  email: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.notPassword,
  })
  @MinLength(variablesForUser.signUpUser.password.min, {
    message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.minLength,
  })
  @MaxLength(variablesForUser.signUpUser.password.max, {
    message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.maxLength,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.passwordNew.strong,
    }
  )
  @Field(() => String, { description: 'Новый пароль пользователя' })
  newPassword: string;

  constructor(newPassword: string, email: string) {
    this.newPassword = newPassword;
    this.email = email;
  }
}
