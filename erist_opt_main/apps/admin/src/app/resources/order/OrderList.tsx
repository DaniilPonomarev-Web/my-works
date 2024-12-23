import { List, Datagrid, TextField, DeleteButton } from 'react-admin';
import OrderFilter from './OrderFilter';

const OrderList = (props) => {
  return (
    <List
      {...props}
      filters={<OrderFilter />}
      bulkActionButtons={false}
      empty={<div>Заказы не найдены</div>}
      sort={{ field: 'currentID', order: 'DESC' }}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField
          source="currentID"
          label="ID"
          className="px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-900"
        />
        <TextField
          source="address"
          label="Адрес"
          className="px-4 py-2 border-b border-gray-200 text-sm text-red"
        />
        <TextField
          source="userCompany_name"
          label="Название компании"
          className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
        />
        <TextField
          source="paymentMethod"
          label="Метод оплаты"
          className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
        />
        <TextField
          source="totalAmount"
          label="Общая сумма"
          className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
        />
        <TextField
          source="discount"
          label="Скидка"
          className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
        />
        <TextField
          source="total"
          label="Итог"
          className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
        />
        <TextField
          source="state"
          label="Статус"
          className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
        />
        <TextField
          source="registred"
          label="Зарегистрировано"
          className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
        />
        {/* <DeleteButton
          label="Удалить"
          className="px-4 py-2 border-b border-gray-200 text-red-500 hover:bg-red-100 rounded-md"
        /> */}
      </Datagrid>
    </List>
  );
};

export default OrderList;
