import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  Show,
  SimpleShowLayout,
  TextField,
  useDataProvider,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  TableContainer,
} from '@material-ui/core';

const OptionShow = (props: any) => {
  const [record, setRecord] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const getOneOption = async () => {
      try {
        const { data } = await dataProvider.getOne('option', {
          id,
        });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении опции:', error);
      }
    };

    if (id) {
      getOneOption();
    }
  }, [dataProvider, id]);

  const handleChange = (event, newIndex: number) => {
    setTabIndex(newIndex);
  };

  if (!record) {
    return <p>Загрузка...</p>;
  }
  const StyledTableContainer = styled(TableContainer)({
    maxHeight: '600px',
    overflow: 'auto',
  });

  const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
  });

  return (
    <Show {...props}>
      <Box>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="Option">
          <Tab label="Основная информация" />
          <Tab label="Значения" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название" />
            <TextField source="type" label="Тип" />
            <TextField source="sortOrder" label="Сортировка" />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>id</StyledTableCell>
                  <StyledTableCell>Название</StyledTableCell>
                  <StyledTableCell>Сортировка</StyledTableCell>
                  <StyledTableCell>Код цвета</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.values &&
                  record.values.map((option: any) => (
                    <TableRow key={option.id}>
                      <TableCell>{option.id}</TableCell>
                      <TableCell>{option.name}</TableCell>
                      <TableCell>{option.sortOrder}</TableCell>
                      <TableCell>{option.colorCode}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
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

export default OptionShow;
