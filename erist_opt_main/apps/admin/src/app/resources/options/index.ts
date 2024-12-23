import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import OptionList from './optionList';
import OptionCreate from './optionCreate';
import OptionShow from './optionShow';
import OptionEdit from './optionEdit';

const resource = {
  list: OptionList,
  create: OptionCreate,
  edit: OptionEdit,
  show: OptionShow,
  icon: DisplaySettingsIcon,
  options: { label: 'Опции' },
};

export default resource;
