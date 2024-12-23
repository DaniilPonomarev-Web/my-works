import DirectionsWalkIcon from '@mui/icons-material/People';
import UserEdit from './userEdit';
import UserShow from './userShow';
import UsersList from './usersList';
import UserCreate from './userCreate';

const resource = {
  list: UsersList,
  create: UserCreate,
  edit: UserEdit,
  show: UserShow,
  icon: DirectionsWalkIcon,
  options: { label: 'Покупатели' },
};

export default resource;
