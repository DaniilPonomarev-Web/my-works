import { Box, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import {
  BooleanField,
  Show,
  SimpleShowLayout,
  TextField,
  useDataProvider,
} from 'react-admin';

import { useParams } from 'react-router-dom';

const UserShow = (props: any) => {
  const [record, setRecord] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [dadataData, setDadataData] = useState(null);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await dataProvider.getOne('users', { id });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя сайта:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [dataProvider, id]);

  useEffect(() => {
    const fetchDadataData = async () => {
      if (tabIndex === 3 && record?.company?.inn) {
        try {
          const result = await dataProvider.getDadataDataUser(
            '',
            record.company.inn
          );
          setDadataData(result.data);
          console.warn(result);
        } catch (error) {
          console.error('Ошибка при получении данных dadata:', error);
        }
      }
    };

    fetchDadataData();
  }, [tabIndex, record, dataProvider]);

  const handleChange = (event, newIndex: number) => {
    setTabIndex(newIndex);
  };

  if (!record) {
    return <p>Загрузка...</p>;
  }

  return (
    <Show {...props}>
      <Box>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="User Tabs">
          <Tab label="Основная информация" />
          <Tab label="Компания" />
          {/* <Tab label="Адреса" /> */}
          <Tab label="Dadata" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="ФИО контактного лица" />
            <TextField source="phone" label="Номер телефона" />
            <TextField source="email" label="E-mail" />
            <TextField source="registrationDate" label="Дата регистрации" />
            <TextField source="lastLogin" label="Дата последней авторизации" />
            <BooleanField source="status" label="Статус" />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="company.name" label="Наименование компании" />
            <TextField source="company.urAddress" label="Юридический адрес" />
            <TextField source="company.inn" label="ИНН" />
            <TextField source="company.kpp" label="КПП" />
            <TextField
              source="company.checkingAccount"
              label="Pасчетный счет"
            />
            <TextField source="company.bankName" label="Наименование банка" />
            <TextField source="company.bikBank" label="БИК банка" />
            <TextField
              source="company.correspondentAccount"
              label="Корреспондентский счет"
            />
          </SimpleShowLayout>
        </TabPanel>
        {/* <TabPanel value={tabIndex} index={2}>
          {record.addresses && record.addresses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Страна</th>
                  <th>Город</th>
                  <th>Улица</th>
                  <th>Номер дома</th>
                  <th>Номер офиса либо квартиры</th>
                </tr>
              </thead>
              <tbody>
                {record.addresses.map((address) => (
                  <tr key={address.id}>
                    <td>{address.country}</td>
                    <td>{address.city}</td>
                    <td>{address.street}</td>
                    <td>{address.home}</td>
                    <td>{address.apartmentORoffice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Нет адресов!</p>
          )}
        </TabPanel> */}
        <TabPanel value={tabIndex} index={3}>
          {dadataData ? (
            <SimpleShowLayout>
              <h2>Данные Dadata</h2>
              <p>
                <strong>ИНН:</strong> {dadataData.inn}
              </p>
              <h3>ФИО</h3>
              <p>
                <strong>Фамилия:</strong>{' '}
                {dadataData.fio.surname || 'Не указано'}
              </p>
              <p>
                <strong>Имя:</strong> {dadataData.fio.name || 'Не указано'}
              </p>
              <p>
                <strong>Отчество:</strong>{' '}
                {dadataData.fio.patronymic || 'Не указано'}
              </p>
              <p>
                <strong>Пол:</strong> {dadataData.fio.gender || 'Не указано'}
              </p>
              <p>
                <strong>Источник:</strong>{' '}
                {dadataData.fio.source || 'Не указано'}
              </p>
              <p>
                <strong>QC:</strong> {dadataData.fio.qc || 'Не указано'}
              </p>
              <h3>Статус</h3>
              <p>
                <strong>Статус:</strong>{' '}
                {dadataData.state.status || 'Не указано'}
              </p>
              <p>
                <strong>Код:</strong> {dadataData.state.code || 'Не указано'}
              </p>
              <p>
                <strong>Дата актуальности:</strong>{' '}
                {dadataData.state.actuality_date || 'Не указана'}
              </p>
              <p>
                <strong>Дата регистрации:</strong>{' '}
                {dadataData.state.registration_date || 'Не указана'}
              </p>
              <p>
                <strong>Дата ликвидации:</strong>{' '}
                {dadataData.state.liquidation_date || 'Не указана'}
              </p>
              <h3>ОГРН</h3>
              <p>
                <strong>ОГРН:</strong> {dadataData.ogrn || 'Не указано'}
              </p>
              <h3>Адрес</h3>
              <p>
                <strong>Полный адрес:</strong>{' '}
                {dadataData.address.value || 'Не указан'}
              </p>
              <p>
                <strong>Неправильный адрес:</strong>{' '}
                {dadataData.address.unrestricted_value || 'Не указан'}
              </p>
              <p>
                <strong>Почтовый индекс:</strong>{' '}
                {dadataData.address.data.postal_code || 'Не указан'}
              </p>
              <p>
                <strong>Страна:</strong>{' '}
                {dadataData.address.data.country || 'Не указана'}
              </p>
              <p>
                <strong>Регион:</strong>{' '}
                {dadataData.address.data.region || 'Не указан'}
              </p>
              <p>
                <strong>Город:</strong>{' '}
                {dadataData.address.data.city || 'Не указан'}
              </p>
              <h3>Организационно-правовая форма</h3>
              <p>
                <strong>Тип:</strong> {dadataData.opf.type || 'Не указано'}
              </p>
              <p>
                <strong>Код:</strong> {dadataData.opf.code || 'Не указан'}
              </p>
              <p>
                <strong>Полное наименование:</strong>{' '}
                {dadataData.opf.full || 'Не указано'}
              </p>
              <p>
                <strong>Краткое наименование:</strong>{' '}
                {dadataData.opf.short || 'Не указано'}
              </p>
              <h3>Наименование</h3>
              <p>
                <strong>Полное с ОПФ:</strong>{' '}
                {dadataData.name.full_with_opf || 'Не указано'}
              </p>
              <p>
                <strong>Краткое с ОПФ:</strong>{' '}
                {dadataData.name.short_with_opf || 'Не указано'}
              </p>
              <h3>Власти</h3>
              <p>
                <strong>Власти:</strong>{' '}
                {dadataData.authorities || 'Не указано'}
              </p>
              <h3>Документы</h3>
              <p>
                <strong>Документы:</strong>{' '}
                {dadataData.documents || 'Не указаны'}
              </p>
              <h3>Лицензии</h3>
              <p>
                <strong>Лицензии:</strong> {dadataData.licenses || 'Не указаны'}
              </p>
              <h3>Финансовые показатели</h3>
              <p>
                <strong>Финансовые показатели:</strong>{' '}
                {dadataData.finance || 'Не указаны'}
              </p>
              <h3>Количество сотрудников</h3>
              <p>
                <strong>Количество сотрудников:</strong>{' '}
                {dadataData.employee_count || 'Не указано'}
              </p>
            </SimpleShowLayout>
          ) : (
            <p> Данные по ИНН не найдены</p>
          )}
        </TabPanel>
      </Box>
    </Show>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default UserShow;
