import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
  useDataProvider,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box } from '@material-ui/core';

const BannerShow = (props) => {
  const [record, setRecord] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await dataProvider.getOne('banners', {
          id,
        });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении баннера главной страницы:', error);
      }
    };

    if (id) {
      fetchBanner();
    }
  }, [dataProvider, id]);

  const handleChange = (event, newIndex) => {
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
          <Tab label="Изображения" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название" />
            <TextField source="title" label="Заголовок" />
            <BooleanField source="status" label="Статус" />
            <TextField source="link" label="Ссылка" />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SimpleShowLayout>
            <ImageField source="image_href" label="Изображение ПК" />
            <ImageField source="image_mob_href" label="Изображение мобильное" />
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

export default BannerShow;
