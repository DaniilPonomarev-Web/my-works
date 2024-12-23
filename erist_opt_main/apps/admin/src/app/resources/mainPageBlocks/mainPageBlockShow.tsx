import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
  UrlField,
  useDataProvider,
} from 'react-admin';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  TableContainer,
} from '@material-ui/core';

const MainPageBlockShow = (props) => {
  const [record, setRecord] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchMainPageBlock = async () => {
      try {
        const { data } = await dataProvider.getOne('mainPageBlocks', {
          id,
        });
        setRecord(data);
      } catch (error) {
        console.error('Ошибка при получении блока главной страницы:', error);
      }
    };

    if (id) {
      fetchMainPageBlock();
    }
  }, [dataProvider, id]);

  const handleChange = (event, newIndex) => {
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
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="Main Page Block tabs"
        >
          <Tab label="Основная информация" />
          <Tab label="Товары" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="name" label="Название блока" />
            <TextField source="title" label="Заголовок" />
            <TextField source="link" label="Ссылка" />
            <TextField source="status" label="Статус" />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Наименование</StyledTableCell>
                  <StyledTableCell>Изображение</StyledTableCell>
                  <StyledTableCell>Модель</StyledTableCell>
                  <StyledTableCell>Цена</StyledTableCell>
                  <StyledTableCell>Количество</StyledTableCell>
                  <StyledTableCell>ID</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell sx={{ color: 'blue' }}>
                      <Link to={`/products/${product.id}`}>
                        {product.description.name}
                      </Link>
                    </TableCell>

                    <TableCell>
                      <ImageField
                        source={product.images[0] ? product.images[0] : null}
                        label="Изображение ПК"
                      />
                    </TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.id}</TableCell>
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

export default MainPageBlockShow;
