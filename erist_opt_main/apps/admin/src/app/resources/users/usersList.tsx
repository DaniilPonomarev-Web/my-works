import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import UsersFilter from './usersFilter';
import AgreementField from './agreementField';
import { DateField } from 'ra-ui-materialui';

const UsersList = (props) => (
  <List
    {...props}
    filters={<UsersFilter />}
    empty={<div>Пользователи не найдены</div>}
    sort={false}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="ФИО контактного лица" />
      <TextField source="phone" label="Номер телефона" />
      <TextField source="email" label="E-mail" />
      {/* <TextField source="registrationDate" label="Дата регистрации" /> */}
      <DateField
        source="registrationDate"
        label="Дата регистрации"
        showTime
        options={{
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }}
      />
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
      {/* <AgreementField source="agreement" label="Договор" /> */}
      <BooleanField source="status" label="Статус" />
    </Datagrid>
  </List>
);

export default UsersList;
