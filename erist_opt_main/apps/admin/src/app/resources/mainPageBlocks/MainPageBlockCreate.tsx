// src/app/resources/mainPageBlocks/MainPageBlockCreate.tsx
import React from 'react';
import {
  BooleanInput,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import ProductSelectInput from './ProductSelectInput';

const MainPageBlockCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="title" label="Заголовок" />
      <TextInput source="link" label="Ссылка" />
      <NumberInput source="sort" label="Порядок сортировки" />
      <BooleanInput label="Статус" source="status" />
      <ProductSelectInput label="Выберите товары" source="products" />
    </SimpleForm>
  </Create>
);

export default MainPageBlockCreate;
