import TroubleshootIcon from '@mui/icons-material/Info';

import InformationCreate from './informationCreate';
import InformationEdit from './informationEdit';
import InformationList from './informationList';
import InformationShow from './informationShow';

const resource = {
  list: InformationList,
  create: InformationCreate,
  edit: InformationEdit,
  show: InformationShow,
  icon: TroubleshootIcon,
  options: { label: 'Статьи "Партнерам"' },
};

export default resource;
