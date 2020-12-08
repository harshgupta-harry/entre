import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

const SlimCardContent = withStyles({
  root: {
    padding: '0px 15px',
  },
})(CardContent);

export default SlimCardContent;
