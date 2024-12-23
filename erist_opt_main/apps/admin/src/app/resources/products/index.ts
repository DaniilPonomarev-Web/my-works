import CheckroomIcon from '@mui/icons-material/Checkroom';
import CustomerCreate from '../customers/customerCreate';
import ProductEdit from './ProductEditOriginal';
import ProductShow from './ProductShow';
import ProductsList from './ProductsList';

const resource = {
  list: ProductsList,
  create: CustomerCreate,
  edit: ProductEdit,
  show: ProductShow,
  icon: CheckroomIcon,
  options: { label: 'Товары' },
};

export default resource;
