import InstagramIcon from '@mui/icons-material/Instagram';
import SocialHrefCreate from './socialhrefsCreate';
import SocialHrefEdit from './socialhrefsEdit';
import SocialHrefList from './socialhrefsList';
import SocialHrefShow from './socialhrefsShow';

const resource = {
  list: SocialHrefList,
  create: SocialHrefCreate,
  edit: SocialHrefEdit,
  show: SocialHrefShow,
  icon: InstagramIcon,
  options: { label: 'Соц ссылки' },
};

export default resource;
