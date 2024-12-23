import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import CustomersFilter from './customersFilter';
import { DateField } from 'ra-ui-materialui';

const CustomersList = (props) => (
  <List
    {...props}
    filters={<CustomersFilter />}
    bulkActionButtons={false}
    empty={<div>Администраторы сайта не найдены</div>}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="login" label="Логин" />
      <TextField source="email" label="E-mail" />
      <TextField source="role" label="Роль" />
      {/* <TextField source="lastLogin" label="Дата последней авторизации" /> */}
      <DateField
        source="lastLogin"
        label="Дата последней авторизации"
        showTime
        options={{
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }}
      />
    </Datagrid>
  </List>
);

export default CustomersList;
