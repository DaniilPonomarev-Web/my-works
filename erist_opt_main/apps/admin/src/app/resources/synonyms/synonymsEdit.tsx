import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const SynonymsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="synonyms" label="Группа синонимов" />
    </SimpleForm>
  </Edit>
);

export default SynonymsEdit;
