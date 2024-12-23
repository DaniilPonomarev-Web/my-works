import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  ImageField,
  RichTextField,
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

const ProductShow = (props) => {
  const [record, setRecord] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await dataProvider.getOne('products', { id });
        setRecord(data);

        // Выполнение запросов для каждой категории
        // console.log(data.categories);

        if (data.categories.length > 0) {
          const categoryPromises = data.categories.map((categoryId) =>
            dataProvider.getOne('category', { id: categoryId })
          );
          const categoryResponses = await Promise.all(categoryPromises);
          // console.log(categoryResponses);

          const categoryNames = categoryResponses.map(
            (response) => response.data.descriptions[0].name
          );
          setCategories(categoryNames);
        }
      } catch (error) {
        console.error('Ошибка при получении данных о продукте:', error);
      }
    };

    if (id) {
      fetchProduct();
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
          <Tab label="Вкладки" />
          <Tab label="Изображения" />
          <Tab label="Другие цвета" />
          <Tab label="Категории" />
          <Tab label="Опции" />
          <Tab label="Связанные товары" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleShowLayout>
            <TextField source="id" label="ID" sortable={false} />
            <TextField source="description.name" label="Название" />
            <TextField source="description.model" label="Модель (Арт)" />
            <RichTextField source="description.description" label="Описание" />
            <TextField source="description.tag" label="Тэг" />
            <TextField source="price" label="Цена" />
            <TextField source="quantity" label="Количество" />
            <TextField source="sortOrder" label="Порядок сортировки" />
            <BooleanField source="status" label="Статус" />
            <TextField source="hrefCloudPhotos" label="Ссылка на архив фото" />
            <TextField source="dateAdded" label="Дата добавления" />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SimpleShowLayout>
            <RichTextField source="description.compound" label="Состав" />
            <RichTextField
              source="description.model_parameters"
              label="Параметры модели"
            />
            <RichTextField source="description.care" label="Уход" />
            <RichTextField
              source="description.parameters"
              label="Параметры изделия"
            />
          </SimpleShowLayout>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Изображение</StyledTableCell>
                  <StyledTableCell>
                    Название изображения в хранилище
                  </StyledTableCell>
                  <StyledTableCell>Сортировка</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.images.map((image: any) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <img
                        src={image.image}
                        alt={image.imageNameMinio}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    </TableCell>
                    <TableCell>{image.imageNameMinio}</TableCell>
                    <TableCell>{image.sortOrder}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    Наименование товара с другим цветом
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.otherColorsProducts.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.description.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    Категории в которых отображается товар
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((categoryName, index) => (
                    <TableRow key={index}>
                      <TableCell>{categoryName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>Категорий нет</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </TabPanel>
        <TabPanel value={tabIndex} index={5}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Название опции</StyledTableCell>
                  <StyledTableCell>Значение</StyledTableCell>
                  <StyledTableCell>Количество</StyledTableCell>
                  <StyledTableCell>Цена</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.options.map((option) =>
                  option.values.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell>{option.name}</TableCell>
                      <TableCell>{value.value.name}</TableCell>
                      <TableCell>{value.quantity}</TableCell>
                      <TableCell>{value.price}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </TabPanel>

        <TabPanel value={tabIndex} index={6}>
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    Нименование связанного товара
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.productsRelated.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.description.name}</TableCell>
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

export default ProductShow;
