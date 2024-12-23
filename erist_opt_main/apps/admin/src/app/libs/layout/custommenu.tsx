import TreeMenu from '@bb-tech/ra-treemenu';
import { Layout } from 'react-admin';

const CustomLayout = (props) => {
  TreeMenu.defaultProps.dashboardlabel = 'My Dashboard';
  return <Layout {...props} menu={TreeMenu} />;
};

export default CustomLayout;
