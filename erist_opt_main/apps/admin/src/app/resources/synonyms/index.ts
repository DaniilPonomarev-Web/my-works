import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import SynonymShow from './synonymsShow';
import SynonymsCreate from './synonymsCreate';
import SynonymsEdit from './synonymsEdit';
import SynonymsList from './synonymsList';

const resource = {
  list: SynonymsList,
  create: SynonymsCreate,
  edit: SynonymsEdit,
  show: SynonymShow,
  icon: TroubleshootIcon,
  options: { label: 'Синонимы поиска' },
};

export default resource;
