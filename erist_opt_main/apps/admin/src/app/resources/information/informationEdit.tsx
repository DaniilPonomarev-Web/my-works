import React from 'react';
import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const InformationEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="title" label="Заголовок" />
      <RichTextInput source="content" label="Содержание" />
      <BooleanInput source="status" label="Статус" />
    </SimpleForm>
  </Edit>
);

export default InformationEdit;
