import PermMediaIcon from '@mui/icons-material/PermMedia';
import BannerCreate from './BannerCreate';
import BannerEdit from './BannerEdit';
import BannerShow from './bannerShow';
import BannersList from './bannersList';

const resource = {
  list: BannersList,
  create: BannerCreate,
  edit: BannerEdit,
  show: BannerShow,
  icon: PermMediaIcon,
  options: { label: 'Баннеры' },
};

export default resource;
