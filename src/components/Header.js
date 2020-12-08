import React from 'react';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import HomeIcon from '@material-ui/icons/Home';
// import SearchIcon from '@material-ui/icons/Search';
// import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
// import FlashOnIcon from '@material-ui/icons/FlashOn';
// import PersonIcon from '@material-ui/icons/Person';
// import { logOut } from '../../common/data/actions';
// import EntreButton from '../common/EntreButton';
import theme from '../theme';

const useStyles = makeStyles(() => ({
  container: {
    height: '93px',
    left: '0px',
    top: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuAndLogo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  logoContainer: {
    padding: '20px 0 20px 0',
    height: '100%',
  },
  logo: {
    height: '100%',
  },
}));

const Header = () => {
  const classes = useStyles(theme);
  return (
    <div className={classes.container}>
      <div className={classes.menuAndLogo}>
        <div className={classes.logoContainer}>
          <img alt="entre" className={classes.logo} src="/logo.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
