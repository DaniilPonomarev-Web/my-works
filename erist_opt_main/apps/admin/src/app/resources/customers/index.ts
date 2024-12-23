import CustomersList from './customersList';
import CustomerCreate from './customerCreate';
import CustomerEdit from './customerEdit';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const resource = {
  list: CustomersList,
  create: CustomerCreate,
  edit: CustomerEdit,
  icon: AdminPanelSettingsIcon,
};

export default resource;
