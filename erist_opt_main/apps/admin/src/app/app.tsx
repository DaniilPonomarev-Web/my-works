import {
  Admin,
  Resource,
  houseLightTheme,
  nanoDarkTheme,
  radiantLightTheme,
} from 'react-admin';
import authProvider from './authProvider';
import i18nProvider from './libs/i18nProvider';
import { Dashboard } from './dashboard/Dashboard';
import dataProvider from './libs/dataProvider';
import HomeIcon from '@mui/icons-material/Home';
import customers from './resources/customers';
import users from './resources/users';
import category from './resources/category';
import products from './resources/products';
import synonyms from './resources/synonyms';
import information from './resources/information';
import socialhrefs from './resources/socialhrefs';
import banners from './resources/banners';
import mainPageBlocks from './resources/mainPageBlocks';
import order from './resources/order';
import CustomMenu from './libs/layout/custommenu';
import options from './resources/options';
import logs from './resources/logs';
import feedback from './resources/feedback';
// import CustomLayout from './libs/layout/custommenu';
import { deepmerge } from '@mui/utils';
import MyLoginPage from './MyLoginPage';

const theme = deepmerge(houseLightTheme, {
  components: {
    // RaDatagrid: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: 'Lavender',
    //       '& .RaDatagrid-headerCell': {
    //         backgroundColor: 'MistyRose',
    //       },
    //     },
    //   },
    // }, //ТАБЛИЦЫ
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'Lavender',
          '& .MuiToolbar-root': {
            backgroundImage:
              'linear-gradient(310deg, #f90283, #ff54e8) !important',
          },
        },
      },
    },
  },
});

const App = () => (
  <Admin
    title="EristAdmin"
    theme={theme}
    darkTheme={nanoDarkTheme}
    authProvider={authProvider}
    dashboard={Dashboard}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    menu={CustomMenu}
    loginPage={MyLoginPage}
    disableTelemetry
    // layout={CustomLayout}
  >
    <Resource name="dealNotes" icon={HomeIcon} />
    <Resource name="orders" {...order} />
    <Resource name="mainPageBlocks" {...mainPageBlocks} />
    <Resource name="banners" {...banners} />
    <Resource name="users" {...users} />
    <Resource name="customers" {...customers} />
    <Resource name="category" {...category} />
    <Resource name="products" {...products} />
    <Resource name="option" {...options} />

    <Resource name="synonyms" {...synonyms} />
    <Resource name="information" {...information} />
    <Resource name="socialHrefs" {...socialhrefs} />
    <Resource name="logs" {...logs} />
    <Resource name="feedback" {...feedback} />
  </Admin>
);

export default App;
