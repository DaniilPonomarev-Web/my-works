import React from 'react';
import {
  BooleanInput,
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

const SynonymsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="synonyms"
        label="Группа синонимов (Пример: слово, слово, слово, слово)"
      />
    </SimpleForm>
  </Create>
);

export default SynonymsCreate;
