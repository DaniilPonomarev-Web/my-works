import React from 'react';
import { Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

const SocialHrefEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="href" label="Ссылка" />
      <NumberInput source="sortOrder" label="Порядок сортировки" />
    </SimpleForm>
  </Edit>
);

export default SocialHrefEdit;
