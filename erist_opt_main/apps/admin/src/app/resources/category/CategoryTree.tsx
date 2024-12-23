import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  TextField,
  List,
  useDataProvider,
  Button,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import {
  Collapse,
  List as MuiList,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryFilter from '../../resources/category/categoryFilter';

const CategoryListTree = (props) => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [filters, setFilters] = useState({});
  const dataProvider = useDataProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesList = async () => {
      try {
        const { data } = await dataProvider.getList('category', {
          pagination: { page: 1, perPage: 1000 },
          filter: filters,
        });

        // console.log('Fetched categories:', data); // Debugging

        const categoryMap = {};
        data.forEach((category) => {
          categoryMap[category.id] = { ...category, children: [] };
        });

        const rootCategories = [];

        data.forEach((category) => {
          if (category.parent_id) {
            categoryMap[category.parent_id].children.push(
              categoryMap[category.id]
            );
          } else {
            rootCategories.push(categoryMap[category.id]);
          }
        });

        setCategories(rootCategories);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    fetchCategoriesList();
  }, [dataProvider, filters]); // Ensure filters is included as a dependency

  const handleClick = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  const renderCategoryTree = (categories, level = 0, index = 0) => {
    return categories.map((category, idx) => {
      const backgroundColor = (index + idx) % 2 === 0 ? '#f5f5f5' : '#ffffff'; // Alternate background colors
      const hasChildren = category.children && category.children.length > 0; // Check if the category has children

      return (
        <div key={category.id}>
          <ListItem
            onClick={() => hasChildren && handleClick(category.id)}
            style={{ paddingLeft: `${level * 20}px`, backgroundColor }}
          >
            <ListItemText
              primary={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      source="descriptions[0].name"
                      record={category}
                      label="Название"
                      style={{ display: 'inline' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <TextField
                      source="sort_order"
                      record={category}
                      label="Порядок сортировки"
                      style={{ display: 'inline' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <BooleanField
                      source="status"
                      record={category}
                      label="Статус"
                      style={{ display: 'inline' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Button
                      label="Редактировать"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the click event from triggering the accordion toggle
                        navigate(`/category/${category.id}`);
                      }}
                      style={{ marginLeft: '20px' }}
                    />
                  </div>
                  {hasChildren && // Only render the arrow if the category has children
                    (openCategory === category.id ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    ))}
                </div>
              }
            />
          </ListItem>
          <Collapse in={openCategory === category.id}>
            <MuiList component="div" disablePadding>
              {renderCategoryTree(
                category.children,
                level + 1,
                index + idx + 1
              )}
            </MuiList>
          </Collapse>
        </div>
      );
    });
  };

  return (
    <List
      {...props}
      pagination={false}
      filters={
        <CategoryFilter onChange={(newFilters) => setFilters(newFilters)} />
      }
    >
      <div style={{ padding: '10px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            marginBottom: '10px',
            width: '100%',
          }}
        >
          <div style={{ flex: 1 }}>Название</div>
          <div style={{ flex: 1 }}>Порядок сортировки</div>
          <div style={{ flex: 1 }}>Статус</div>
          <div style={{ flex: 1 }}>Действия</div>
        </div>
        {renderCategoryTree(categories)}
      </div>
    </List>
  );
};

export default CategoryListTree;
