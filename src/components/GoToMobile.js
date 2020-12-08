import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EntreButton from './EntreButton';

const useStyles = makeStyles(() => ({
  bg: {
    position: 'fixed',
    backgroundColor: '#00000066',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    position: 'absolute',
    backgroundColor: '#FFF',
    boxShadow: '0px -5px 20px -5px rgba(0, 0, 0, 0.5)',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
}));

const GoToMobile = (props) => {
  const classes = useStyles();

  const getTheApp = () => {
    const urls = {
      Android: 'https://play.google.com/store/apps/details?id=com.joinentre',
      iOS: 'https://apps.apple.com/us/app/entre-entrepreneur-network/id1486408018',
    };
    window.open(
      urls[props.os],
      '_blank',
    );
  };

  const dismiss = () => {
    props.onClose();
  };

  return (
    <div className={classes.bg}>
      <div className={classes.container}>
        <div className={classes.text}>Get our app to get the full Entre experience</div>
        <EntreButton
          type="submit"
          fullWidth
          variant="contained"
          component="span"
          color="primary"
          onClick={getTheApp}
        >
          Get the app
        </EntreButton>
        <div>or</div>
        <EntreButton
          type="submit"
          fullWidth
          variant="text"
          color="primary"
          component="span"
          onClick={dismiss}
        >
          <span style={{ color: '#00C4FF' }}>Continue in web</span>
        </EntreButton>
      </div>
    </div>
  );
};

GoToMobile.propTypes = {
  onClose: PropTypes.func.isRequired,
  os: PropTypes.string.isRequired,
};


export default GoToMobile;
