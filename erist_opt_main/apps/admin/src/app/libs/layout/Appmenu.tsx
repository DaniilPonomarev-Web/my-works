import { Menu } from 'react-admin';
import Submenu from './Submenu';
import LabelIcon from '@mui/icons-material/Label';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Submenu text="Submenu 1" icon={<ReceiptIcon />}>
      <Menu.ResourceItem name="posts" />
      <Menu.ResourceItem name="comments" />
    </Submenu>
    <Submenu text="Submenu 2" icon={<CreditCardIcon />}>
      <Menu.ResourceItem name="users" />
      <Menu.Item
        to="/custom-route"
        primaryText="Miscellaneous"
        leftIcon={<LabelIcon />}
      />
    </Submenu>
  </Menu>
);
