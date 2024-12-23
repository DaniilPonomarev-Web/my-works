import React from 'react';
import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';

const UserEdit = (props) => (
  <Edit {...props} actions={false}>
    <SimpleForm>
      <TextInput source="name" label="ФИО ИМЯ" />
      <TextInput source="phone" label="Номер телефона" />
      <BooleanInput label="Статус" source="status" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
