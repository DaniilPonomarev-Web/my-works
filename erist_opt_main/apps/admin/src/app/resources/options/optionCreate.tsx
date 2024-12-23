import {
  ArrayInput,
  Create,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from 'react-admin';

const OptionCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="type" defaultValue="radio" label="Тип" />
      <NumberInput source="sortOrder" label="Сортировка" />
      <ArrayInput source="values" label="Значения">
        <SimpleFormIterator>
          <TextInput source="name" label="Имя" />
          <NumberInput source="sortOrder" label="Сортировка" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default OptionCreate;
