import CustomerCreate from '../customers/customerCreate';
import CategoryEdit from './CategoryEdit';
import CategoryList from './CategoryList';
import CategoryShow from './CategoryShow';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoryListTree from './CategoryTree';

const resource = {
  list: CategoryListTree,
  create: CustomerCreate,
  edit: CategoryEdit,
  show: CategoryShow,
  icon: MenuBookIcon,
  options: { label: 'Категории' },
};

export default resource;
