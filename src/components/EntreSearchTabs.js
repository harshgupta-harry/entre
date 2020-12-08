import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

const EntreSearchTabs = withStyles({
  root: {
    width: '100%',
    padding: '0 12px',
  },
  flexContainer: {
    justifyContent: 'space-between',
  },
  indicator: {
    backgroundColor: '#00C4FF',
  },
})(Tabs);

export default EntreSearchTabs;
