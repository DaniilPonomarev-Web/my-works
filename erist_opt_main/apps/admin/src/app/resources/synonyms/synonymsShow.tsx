import React, { useEffect, useState } from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  useDataProvider,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box } from '@material-ui/core';

const SynonymShow = (props: any) => {
  const [record, setRecord] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const getOneGroupSynonyms = async () => {
      try {
        const { data } = await dataProvider.getOne('synonyms', {
          id,
        });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении группы синонимов:', error);
      }
    };

    if (id) {
      getOneGroupSynonyms();
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
            <TextField source="synonyms" label="Группа синонимов" />
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

export default SynonymShow;
