import PostIcon from '@mui/icons-material/Book';
import OrderList from './OrderList';
import OrderShow from './OrderShow';

const resource = {
  list: OrderList,
  show: OrderShow,
  icon: PostIcon,
  options: { label: 'Заказы' },
};

export default resource;
