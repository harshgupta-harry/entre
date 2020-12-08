import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EntreButton from './EntreButton';

const useStyles = makeStyles(() => ({
  container: {
    position: 'fixed',
    backgroundColor: '#FFF',
    boxShadow: '0px -5px 20px -5px rgba(0, 0, 0, 0.5)',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const GoToMobile = (props) => {
  const classes = useStyles();
  const { onClick } = props;

  return (
    <div className={classes.container}>
      <EntreButton
        type="submit"
        fullWidth
        variant="contained"
        component="span"
        color="primary"
        onClick={onClick}
      >
        Get tickets
      </EntreButton>
    </div>
  );
};

GoToMobile.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default GoToMobile;
