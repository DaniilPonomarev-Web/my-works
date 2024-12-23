import React from 'react';
import { BooleanInput, Create, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const InformationCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="title" label="Заголовок" />
      <RichTextInput source="content" label="Содержание" />
      <BooleanInput source="status" label="Статус" />
    </SimpleForm>
  </Create>
);

export default InformationCreate;
