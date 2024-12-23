import React, { useEffect, useState } from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  UrlField,
  useDataProvider,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  TableCell,
} from '@material-ui/core';
import OrderStatusUpdate from './OrderStatusUpdate';
import { styled } from '@mui/system';

const OrderShow = (props) => {
  const [record, setRecord] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await dataProvider.getOne('orders', { id });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении заказа:', error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [dataProvider, id]);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  if (!record) {
    return <p>Загрузка...</p>;
  }
  const StyledTableContainer = styled(TableContainer)({
    maxHeight: '400px',
  });

  const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
  });

  return (
    <Show {...props}>
      <Box>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="Order tabs">
          <Tab label="Основная информация" />
          <Tab label="Информация о покупателе" />
          <Tab label="Товары" />
          <Tab label="Действия" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="paymentMethod" label="Метод оплаты" />
            <TextField source="totalAmount" label="Общая сумма" />
            <TextField source="discount" label="Скидка" />
            <TextField source="total" label="Итог" />
            <TextField source="state" label="Статус" />
            <UrlField source="hrefForInvoice" label="Счет на оплату" />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SimpleShowLayout>
            <TextField source="address" label="Адрес" />
            <TextField source="userCompany_name" label="Название компании" />
            <TextField source="userCompany_inn" label="ИНН компании" />
            <TextField source="userCompany_kpp" label="КПП компании" />
            <TextField
              source="userCompany_bikBank"
              label="БИК банка компании"
            />
            <TextField
              source="userCompany_bankName"
              label="Название банка компании"
            />
            <TextField
              source="userCompany_urAddress"
              label="Юридический адрес компании"
            />
            <TextField
              source="userCompany_checkingAccount"
              label="Расчетный счет компании"
            />
            <TextField
              source="userCompany_correspondentAccount"
              label="Корреспондентский счет компании"
            />
          </SimpleShowLayout>
        </TabPanel>{' '}
        <TabPanel value={tabIndex} index={2}>
          {record.products && record.products.length > 0 ? (
            <StyledTableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Наименование</StyledTableCell>
                    <StyledTableCell>Модель</StyledTableCell>
                    <StyledTableCell>Цена</StyledTableCell>
                    <StyledTableCell>Опция</StyledTableCell>
                    <StyledTableCell>Количество</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {record.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.model}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.optionName}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          ) : (
            <p>Нет товаров</p>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <OrderStatusUpdate orderId={record.id} currentState={record.state} />
        </TabPanel>
      </Box>
    </Show>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default OrderShow;
