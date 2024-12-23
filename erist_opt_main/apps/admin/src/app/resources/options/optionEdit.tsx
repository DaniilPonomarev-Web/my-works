import React from 'react';
import {
  ArrayInput,
  Edit,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from 'react-admin';

const OptionEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Опция" />
      <ArrayInput source="values" label="Значения">
        <SimpleFormIterator>
          <TextField source="id" label="ID" />
          <TextInput source="name" label="Значение" />
          <TextInput source="colorCode" label="Код цвета" />
          <NumberInput source="sortOrder" label="Сортировка" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default OptionEdit;
