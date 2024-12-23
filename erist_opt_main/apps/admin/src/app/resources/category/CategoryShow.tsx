import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  FunctionField,
  ImageField,
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
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  TableContainer,
} from '@material-ui/core';

const CategoryShow = (props) => {
  const [record, setRecord] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchMainPageBlock = async () => {
      try {
        const { data } = await dataProvider.getOne('category', {
          id,
        });
        setRecord(data);
        console.warn(data);
      } catch (error) {
        console.error('Ошибка при получении блока главной страницы:', error);
      }
    };

    if (id) {
      fetchMainPageBlock();
    }
  }, [dataProvider, id]);

  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
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

  const CategoryStatusField = ({ record }: { record: any }) => {
    if (!record) return null;
    return record.parent_id ? 'Дочерняя категория' : 'Главная категория';
  };

  return (
    <Show {...props}>
      <Box>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="Main Page Block tabs"
        >
          <Tab label="Основная информация" />
          <Tab label="Изображения" />
          <Tab label="Дочерние категории" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="id" label="ID" sortable={false} />
            <TextField source="descriptions[0].name" label="Название" />
            <TextField source="descriptions[0].description" label="Описание" />
            <TextField source="descriptions[0].meta_title" label="Мета тайтл" />
            <TextField
              source="descriptions[0].meta_h1"
              label="Мета заголовок"
            />
            <TextField
              source="descriptions[0].meta_description"
              label="Мета описание"
            />
            <BooleanField source="status" label="Статус" />
            <BooleanField source="onHomePage" label="На главной странице" />

            <FunctionField
              label="Тип категории"
              render={(record) => <CategoryStatusField record={record} />}
            />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Изображение</StyledTableCell>
                  <StyledTableCell>
                    Название изображения в хранилище
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <ImageField source="image" />
                  </TableCell>
                  <TableCell>
                    <TextField source="image" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>id</StyledTableCell>
                  <StyledTableCell>Название</StyledTableCell>
                  <StyledTableCell>Статус</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.children &&
                  record.children.map((category: any) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.descriptions[0].name}</TableCell>
                      <TableCell>
                        <BooleanField
                          source={category.status}
                          label={category.status}
                        />
                      </TableCell>
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

const TabPanel = ({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  value: number;
  index: number;
}) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default CategoryShow;
