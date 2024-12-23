import React from 'react';
import { Filter, TextInput } from 'react-admin';

const CustomersFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Имя" source="filterLogin" />
    <TextInput label="Email" source="filterEmail" />
  </Filter>
);

export default CustomersFilter;
