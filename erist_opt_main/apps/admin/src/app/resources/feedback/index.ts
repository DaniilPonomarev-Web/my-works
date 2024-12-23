import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import FeedbackList from './feedbackList';
import FeedbackShow from './feedbackShow';
import FeedbackEdit from './feedbackEdit';

const resource = {
  list: FeedbackList,
  edit: FeedbackEdit,
  show: FeedbackShow,
  icon: TroubleshootIcon,
  options: { label: 'Запросы с сайта' },
};

export default resource;
