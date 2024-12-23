import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MainPageBlockCreate from './MainPageBlockCreate';
import MainPageBlockEdit from './MainPageBlockEdit';
import MainPageBlockShow from './mainPageBlockShow';
import MainPageBlocksList from './mainPageBlocksList';

const resource = {
  list: MainPageBlocksList,
  show: MainPageBlockShow,
  create: MainPageBlockCreate,
  edit: MainPageBlockEdit,
  icon: ViewModuleIcon,
  options: { label: 'Рекомендуемые' },
};

export default resource;
