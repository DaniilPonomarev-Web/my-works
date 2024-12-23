import React from 'react';
import {
  BooleanInput,
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

const roleChoices = [
  { id: 'Admin', name: 'Администратор' },
  { id: 'Manager', name: 'Менеджер' },
  { id: 'Context', name: 'Контекст' },
];

const CustomerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="login" label="Логин для входа" />
      <TextInput source="email" label="Email" />
      <TextInput source="password" label="Пароль" />
      <SelectInput source="role" label="Роль" choices={roleChoices} />
    </SimpleForm>
  </Create>
);

export default CustomerCreate;
