import React from 'react';
import {
  BooleanInput,
  Edit,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

const roleChoices = [
  { id: 'Admin', name: 'Администратор' },
  { id: 'Manager', name: 'Менеджер' },
  { id: 'Context', name: 'Контекст' },
];

const CustomerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="login" label="Логин для входа *" />
      <TextInput source="email" label="Email *" />
      <SelectInput source="role" label="Роль" choices={roleChoices} />
      <TextInput source="password" label="Пароль ?" />
    </SimpleForm>
  </Edit>
);

export default CustomerEdit;
