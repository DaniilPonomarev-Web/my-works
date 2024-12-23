import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
  useDataProvider,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box } from '@material-ui/core';

const InformationShow = (props: any) => {
  const [record, setRecord] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const getOneInformation = async () => {
      try {
        const { data } = await dataProvider.getOne('information', {
          id,
        });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении информационной страницы:', error);
      }
    };

    if (id) {
      getOneInformation();
    }
  }, [dataProvider, id]);

  const handleChange = (event, newIndex: number) => {
    setTabIndex(newIndex);
  };

  if (!record) {
    return <p>Загрузка...</p>;
  }

  return (
    <Show {...props}>
      <Box>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="Banners">
          <Tab label="Основная информация" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название" />
            <TextField source="title" label="Заголовок" />
            <RichTextField source="content" label="Содержание" />

            <BooleanField source="status" label="Статус" />
          </SimpleShowLayout>
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

export default InformationShow;
