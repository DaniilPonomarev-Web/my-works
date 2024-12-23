import React from 'react';
import {
  BooleanInput,
  Create,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

const SocialHrefCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="href" label="Ссылка" />
      <NumberInput source="sortOrder" label="Порядок сортировки" />
    </SimpleForm>
  </Create>
);

export default SocialHrefCreate;
