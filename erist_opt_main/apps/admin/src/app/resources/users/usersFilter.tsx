import React from 'react';
import { Filter, TextInput, BooleanInput } from 'react-admin';

const UsersFilter = (props) => (
  <Filter {...props}>
    <BooleanInput label="Статус" source="filterStatus" defaultValue={true} />
    <TextInput label="Имя" source="filterName" />
    <TextInput label="Телефон" source="filterPhone" />
    <TextInput label="Email" source="filterEmail" />
  </Filter>
);

export default UsersFilter;
