import React, { useEffect, useState } from 'react';
import {
  Show,
  TextField,
  BooleanField,
  SimpleShowLayout,
  useDataProvider,
  Labeled,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';

const FeedbackShow = (props: any) => {
  const [record, setRecord] = useState(null);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const getOneFeedback = async () => {
      try {
        const { data } = await dataProvider.getOne('feedback', {
          id,
        });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении запроса:', error);
      }
    };

    if (id) {
      getOneFeedback();
    }
  }, [dataProvider, id]);

  if (!record) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Show {...props} record={record}>
      <SimpleShowLayout>
        <Labeled label="ID">
          <TextField source="id" />
        </Labeled>
        <Labeled label="Текст">
          <TextField source="text" />
        </Labeled>
        <Labeled label="Статус">
          <BooleanField source="status" />
        </Labeled>

        <hr />

        <Labeled label="ID пользователя">
          <TextField source="user.id" />
        </Labeled>
        <Labeled label="ИНН пользователя">
          <TextField source="user.company.inn" />
        </Labeled>
        <Labeled label="Название компании пользователя">
          <TextField source="user.company.name" />
        </Labeled>
      </SimpleShowLayout>
    </Show>
  );
};

export default FeedbackShow;
