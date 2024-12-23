import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  minLength,
  maxLength,
  regex,
} from 'react-admin';

// Валидации для полей
const validatePhone = [required(), minLength(11), maxLength(12)];
const validatePassword = [
  required(),
  minLength(8),
  maxLength(20),
  regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.'
  ),
];
const validateName = [required(), minLength(2), maxLength(40)];
const validateCompanyName = [required(), minLength(3), maxLength(200)];
const validateUrAddress = [required(), minLength(3), maxLength(200)];
const validateInn = [required(), minLength(10), maxLength(12)];
const validateKpp = [maxLength(9), minLength(9)];
const validateCountry = [required(), minLength(3), maxLength(50)];
const validateCity = [required(), minLength(3), maxLength(50)];
const validateStreet = [required(), minLength(3), maxLength(50)];
const validateHome = [required(), minLength(1), maxLength(10)];
const validateApartmentOrOffice = [required(), minLength(1), maxLength(10)];

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="ФИО ИМЯ" validate={validateName} />
      <TextInput source="email" label="Email" validate={required()} />
      <TextInput
        source="phone"
        label="Номер телефона (c +7)"
        validate={validatePhone}
        defaultValue={'+7'}
      />
      <TextInput
        source="password"
        label="Пароль"
        validate={validatePassword}
        type="password"
      />
      <TextInput
        source="company.name"
        label="Название компании"
        validate={validateCompanyName}
      />
      <TextInput
        source="company.urAddress"
        label="Юридический адрес"
        validate={validateUrAddress}
      />
      <TextInput source="company.inn" label="ИНН" validate={validateInn} />
      <TextInput
        source="company.kpp"
        label="КПП (Оставьте пустым если нет)"
        validate={validateKpp}
      />
      <TextInput source="company.bankName" label="Название банка" />
      <TextInput source="company.bikBank" label="БИК банка" />
      <TextInput source="company.checkingAccount" label="Расчётный счёт" />
      <TextInput
        source="company.correspondentAccount"
        label="Корреспондентский счёт"
      />

      {/* Адреса */}
      <ArrayInput source="addresses" label="Адреса (Добавлять только 1)">
        <SimpleFormIterator>
          <TextInput
            source="country"
            label="Страна"
            defaultValue={'Россия'}
            validate={validateCountry}
          />
          <TextInput source="city" label="Город" validate={validateCity} />
          <TextInput source="street" label="Улица" validate={validateStreet} />
          <TextInput source="home" label="Дом" validate={validateHome} />
          <TextInput
            source="apartmentORoffice"
            label="Квартира/Офис"
            validate={validateApartmentOrOffice}
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default UserCreate;
