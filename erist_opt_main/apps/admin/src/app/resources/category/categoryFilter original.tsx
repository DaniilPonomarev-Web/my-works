import React from 'react';
import { BooleanInput, Filter, TextInput } from 'react-admin';

const CategoryFilter = (props) => (
  <Filter {...props}>
    <BooleanInput label="Статус" source="filterStatus" defaultValue={true} />
    <TextInput label="Название" source="filterName" defaultValue={null} />
    <TextInput
      label="Описание"
      source="filterDescription"
      defaultValue={null}
    />
    {/* <BooleanInput label="Главная категори" source="filterMainCategory" /> */}
  </Filter>
);

export default CategoryFilter;
