import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const EntreSearchTab = withStyles({
  root: {
    minWidth: '90px',
  },
  wrapper: {
    fontSize: 16,
  },
})(Tab);

export default EntreSearchTab;
