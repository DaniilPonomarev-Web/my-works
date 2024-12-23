import React from 'react';
import { Filter, TextInput, NumberInput, DateInput } from 'react-admin';

const OrderFilter = (props) => (
  <Filter {...props}>
    <NumberInput label="Номер заказа" source="orderNumber" alwaysOn />
    <TextInput label="Название товара" source="productName" />
    <NumberInput label="Сумма ОТ" source="totalAmountFrom" />
    <NumberInput label="Сумма ДО" source="totalAmountTo" />
    <DateInput label="Дата от" source="dateFrom" />
    <DateInput label="Дата до" source="dateTo" />
  </Filter>
);

export default OrderFilter;
