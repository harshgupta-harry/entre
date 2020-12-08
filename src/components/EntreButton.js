import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const EntreButton = withStyles({
  root: {
    borderRadius: '10px',
  },
  text: {
    textTransform: 'none',
    color: '#00C4FF',
    '&:hover': {
      color: '#0069d9 !important',
    },
  },
  outlined: {
    borderColor: '#00C4FF',
    color: '#00C4FF',
    textTransform: 'none',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#00C4FF',
    },
  },
  contained: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 20,
    fontWeight: 'bold',
    padding: '10px 40px',
    margin: '5px',
    color: '#FFF',
    backgroundColor: '#00C4FF',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  },
  textPrimary: {
    backgroundColor: 'transparent',
  },
  sizeSmall: {
    fontSize: 14,
    padding: '3px 10px',
  },
  sizeLarge: {
    fontSize: 16,
    padding: '8px 20px',
  },
})(Button);

export default EntreButton;
