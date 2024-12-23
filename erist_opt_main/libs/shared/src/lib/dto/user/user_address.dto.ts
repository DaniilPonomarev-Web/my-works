import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  IAddressId,
  ICreateAddress,
  IUpdateAddress,
  IUserAddress,
} from '../../interfaces';
import { IsNotEmpty, Length } from 'class-validator';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';
import { variablesForUser } from '../../variables';

@ObjectType({ description: 'Адрес пользователя' })
export class UserAddressDTO implements IUserAddress {
  @Field(() => ID, { description: 'ID адреса' })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Страна',
  })
  country: string;

  @Field(() => String, {
    nullable: false,
    description: 'Город',
  })
  city: string;

  @Field(() => String, {
    nullable: false,
    description: 'Улица',
  })
  street: string;

  @Field(() => String, {
    nullable: false,
    description: 'Номер дома',
  })
  home: string;

  @Field(() => String, {
    nullable: false,
    description: 'Номер офиса либо квартиры',
  })
  apartmentORoffice: string;

  constructor(
    id: string,
    country: string,
    city: string,
    street: string,
    home: string,
    apartmentORoffice: string
  ) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.street = street;
    this.home = home;
    this.apartmentORoffice = apartmentORoffice;
  }
}

@InputType({ description: 'Входные данные для обновления адреса' })
export class UpdateAddressDto implements IUpdateAddress {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.id,
  })
  @Field(() => String, { nullable: false, description: 'ID адреса' })
  id: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.country.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.apartmentORoffice.min,
    variablesForUser.signUpUser.addresses.apartmentORoffice.max,
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.addresses.country.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Страна' })
  country: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.city.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.city.min,
    variablesForUser.signUpUser.addresses.city.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.addresses.city.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Город' })
  city: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.street.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.street.min,
    variablesForUser.signUpUser.addresses.street.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.addresses.street.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Улица' })
  street: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.home.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.home.min,
    variablesForUser.signUpUser.addresses.home.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.addresses.home.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Номер дома' })
  home: string;

  @IsNotEmpty({
    message:
      HttpExceptionMessagesGraphQL.valiadtions.addresses.apartmentORoffice.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.apartmentORoffice.min,
    variablesForUser.signUpUser.addresses.apartmentORoffice.max,
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.addresses.apartmentORoffice
          .length,
    }
  )
  @Field(() => String, {
    nullable: false,
    description: 'Номер офиса либо квартиры',
  })
  apartmentORoffice: string;

  constructor(
    id: string,
    country: string,
    city: string,
    street: string,
    home: string,
    apartmentORoffice: string
  ) {
    this.id = id;
    this.country = country;
    this.city = city;
    this.street = street;
    this.home = home;
    this.apartmentORoffice = apartmentORoffice;
  }
}

@InputType({ description: 'Адрес пользователя' })
export class UserAddressInputDTO implements ICreateAddress {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.country.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.apartmentORoffice.min,
    variablesForUser.signUpUser.addresses.apartmentORoffice.max,
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.addresses.country.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Страна' })
  country: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.city.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.city.min,
    variablesForUser.signUpUser.addresses.city.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.addresses.city.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Город' })
  city: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.street.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.street.min,
    variablesForUser.signUpUser.addresses.street.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.addresses.street.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Улица' })
  street: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.home.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.home.min,
    variablesForUser.signUpUser.addresses.home.max,
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.addresses.home.length,
    }
  )
  @Field(() => String, { nullable: false, description: 'Номер дома' })
  home: string;

  @IsNotEmpty({
    message:
      HttpExceptionMessagesGraphQL.valiadtions.addresses.apartmentORoffice.not,
  })
  @Length(
    variablesForUser.signUpUser.addresses.apartmentORoffice.min,
    variablesForUser.signUpUser.addresses.apartmentORoffice.max,
    {
      message:
        HttpExceptionMessagesGraphQL.valiadtions.addresses.apartmentORoffice
          .length,
    }
  )
  @Field(() => String, {
    nullable: false,
    description: 'Номер офиса либо квартиры',
  })
  apartmentORoffice: string;

  constructor(
    country: string,
    city: string,
    street: string,
    home: string,
    apartmentORoffice: string
  ) {
    this.country = country;
    this.city = city;
    this.street = street;
    this.home = home;
    this.apartmentORoffice = apartmentORoffice;
  }
}

@InputType({ description: 'Входные данные с id адреса' })
export class AddressIdDTO implements IAddressId {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.addresses.id,
  })
  @Field(() => String, { nullable: false, description: 'ID адреса' })
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
