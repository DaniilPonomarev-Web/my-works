import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IUpdateCompany, IUserCompany } from '../../interfaces';
import { variablesForUser } from '../../variables';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';

@ObjectType({ description: 'Компания пользователя' })
export class UserCompanyDTO implements IUserCompany {
  @Field(() => ID, { description: 'ID компании' })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Наименование компании',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Юридический адрес',
  })
  urAddress: string;

  @Field(() => String, {
    nullable: false,
    description: 'ИНН',
  })
  inn: string;

  @Field(() => String, {
    nullable: true,
    description: 'КПП',
  })
  kpp: string;

  @Field(() => String, {
    nullable: true,
    description: 'ОГРН(-ИП)',
  })
  ogrn: string;

  @Field(() => String, { description: 'расчетный счет', nullable: false })
  checkingAccount: string;

  @Field(() => String, { description: 'Название банка', nullable: false })
  bankName: string;

  @Field(() => String, { description: 'БИК банка', nullable: false })
  bikBank: string;

  @Field(() => String, {
    description: 'Корреспондентский счет',
    nullable: false,
  })
  correspondentAccount: string;

  constructor(
    id: string,
    name: string,
    urAddress: string,
    inn: string,
    kpp: string,
    ogrn: string,
    checkingAccount: string,
    bankName: string,
    bikBank: string,
    correspondentAccount: string
  ) {
    this.id = id;
    this.name = name;
    this.urAddress = urAddress;
    this.inn = inn;
    this.kpp = kpp;
    this.ogrn = ogrn;
    this.checkingAccount = checkingAccount;
    this.bankName = bankName;
    this.bikBank = bikBank;
    this.correspondentAccount = correspondentAccount;
  }
}

@InputType({ description: 'Компания пользователя' })
export class UserCompanyInputDTO implements IUpdateCompany {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.company.name.notName,
  })
  @MinLength(variablesForUser.signUpUser.company.name.min, {
    message: HttpExceptionMessagesGraphQL.valiadtions.company.name.minLenght,
  })
  @MaxLength(variablesForUser.signUpUser.company.name.max, {
    message: HttpExceptionMessagesGraphQL.valiadtions.company.name.maxLenght,
  })
  @Field(() => String, {
    nullable: false,
    description: 'Наименование компании',
  })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.company.urAddress.notName,
  })
  @MinLength(variablesForUser.signUpUser.company.urAddress.min, {
    message:
      HttpExceptionMessagesGraphQL.valiadtions.company.urAddress.minLenght,
  })
  @MaxLength(variablesForUser.signUpUser.company.urAddress.max, {
    message:
      HttpExceptionMessagesGraphQL.valiadtions.company.urAddress.maxLenght,
  })
  @Field(() => String, { nullable: false, description: 'Юридический адрес' })
  urAddress: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.company.inn.notINN,
  })
  @Length(
    variablesForUser.signUpUser.company.inn.min,
    variablesForUser.signUpUser.company.inn.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.company.inn.length,
    }
  )
  @IsNumberString(
    { no_symbols: true },
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.company.inn.errorCharter,
    }
  )
  @Field(() => String, { nullable: false, description: 'ИНН' })
  inn: string;

  @IsOptional()
  @Length(
    variablesForUser.signUpUser.company.kpp.fix,
    variablesForUser.signUpUser.company.kpp.fix,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.company.kpp.FixedLength,
    }
  )
  @IsNumberString(
    { no_symbols: true },
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.company.kpp.errorCharter,
    }
  )
  @Field(() => String, { nullable: true, description: 'КПП' })
  kpp: string;

  @IsNumberString(
    { no_symbols: true },
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.company.ogrn.errorCharter,
    }
  )
  @Field(() => String, { nullable: true, description: 'ОГРН(-ИП)' })
  ogrn: string;

  @IsNotEmpty({
    message: 'Введите расчетный счет',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'Допустимы только числовые значения',
    }
  )
  @Field(() => String, { nullable: false, description: 'расчетный счет' })
  checkingAccount: string;

  @IsNotEmpty({
    message: 'Введите название банка',
  })
  @Field(() => String, { nullable: false, description: 'Название банка' })
  bankName: string;

  @IsNotEmpty({
    message: 'Введите БИК банка',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'Допустимы только числовые значения',
    }
  )
  @Field(() => String, { nullable: false, description: 'БИК банка' })
  bikBank: string;

  @IsNotEmpty({
    message: 'Введите корреспондентский счет',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'Допустимы только числовые значения',
    }
  )
  @Field(() => String, {
    nullable: false,
    description: 'Корреспондентский счет',
  })
  correspondentAccount: string;

  constructor(
    name: string,
    urAddress: string,
    inn: string,
    kpp: string,
    checkingAccount: string,
    bankName: string,
    bikBank: string,
    correspondentAccount: string
  ) {
    this.name = name;
    this.urAddress = urAddress;
    this.inn = inn;
    this.kpp = kpp;
    this.checkingAccount = checkingAccount;
    this.bankName = bankName;
    this.bikBank = bikBank;
    this.correspondentAccount = correspondentAccount;
  }
}

@InputType()
export class UpdateCompanyDto implements IUpdateCompany {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.company.name.notName,
  })
  @MinLength(variablesForUser.signUpUser.company.name.min, {
    message: HttpExceptionMessagesGraphQL.valiadtions.company.name.minLenght,
  })
  @MaxLength(variablesForUser.signUpUser.company.name.max, {
    message: HttpExceptionMessagesGraphQL.valiadtions.company.name.maxLenght,
  })
  @Field(() => String, {
    nullable: false,
    description: 'Наименование компании',
  })
  name: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.company.urAddress.notName,
  })
  @MinLength(variablesForUser.signUpUser.company.urAddress.min, {
    message:
      HttpExceptionMessagesGraphQL.valiadtions.company.urAddress.minLenght,
  })
  @MaxLength(variablesForUser.signUpUser.company.urAddress.max, {
    message:
      HttpExceptionMessagesGraphQL.valiadtions.company.urAddress.maxLenght,
  })
  @Field(() => String, { nullable: false, description: 'Юридический адрес' })
  urAddress: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.company.inn.notINN,
  })
  @Length(
    variablesForUser.signUpUser.company.inn.min,
    variablesForUser.signUpUser.company.inn.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.company.inn.length,
    }
  )
  @IsNumberString(
    { no_symbols: true },
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.company.inn.errorCharter,
    }
  )
  @Field(() => String, { nullable: false, description: 'ИНН' })
  inn: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'КПП',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.company.kpp.errorCharter,
    }
  )
  kpp: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'ОГРН(-ИП)',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.company.ogrn.errorCharter,
    }
  )
  ogrn: string;

  @IsNotEmpty({
    message: 'Введите расчетный счет',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'Допустимы только числовые значения',
    }
  )
  @Field(() => String, { nullable: false, description: 'расчетный счет' })
  checkingAccount: string;

  @IsNotEmpty({
    message: 'Введите название банка',
  })
  @Field(() => String, { nullable: false, description: 'Название банка' })
  bankName: string;

  @IsNotEmpty({
    message: 'Введите БИК банка',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'Допустимы только числовые значения',
    }
  )
  @Field(() => String, { nullable: false, description: 'БИК банка' })
  bikBank: string;

  @IsNotEmpty({
    message: 'Введите корреспондентский счет',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'Допустимы только числовые значения',
    }
  )
  @Field(() => String, {
    nullable: false,
    description: 'Корреспондентский счет',
  })
  correspondentAccount: string;

  constructor(
    name: string,
    urAddress: string,
    inn: string,
    kpp: string,
    checkingAccount: string,
    bankName: string,
    bikBank: string,
    correspondentAccount: string
  ) {
    this.name = name;
    this.urAddress = urAddress;
    this.inn = inn;
    this.kpp = kpp;
    this.checkingAccount = checkingAccount;
    this.bankName = bankName;
    this.bikBank = bikBank;
    this.correspondentAccount = correspondentAccount;
  }
}
