import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    maxWidth: 500,
    marginTop: 30,
    minHeight: 60,
  },
  input: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '60px',
    background: '#FFFFFF',
    boxShadow: '1px 3px 4px 1px rgba(0, 0, 0, 0.25), 0px 10px 15px rgba(30, 38, 109, 0.1)',
    borderRadius: '100px',
    border: 'none',
    paddingLeft: 20,
    outline: 0,
    fontSize: 18,
    paddingRight: 150,
    '@media (max-width:600px)': {
      fontSize: 15,
      height: 40,
    },
  },
  submit: {
    position: 'absolute',
    width: '160px',
    height: '60px',
    right: 0,
    background: '#00C4FF',
    boxShadow: '0px 10px 15px rgba(30, 38, 109, 0.1)',
    borderRadius: '100px',
    '@media (max-width:600px)': {
      fontSize: 14,
      height: 40,
      width: 140,
    },
  },
  label: {
    margin: 'auto',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '15px',
    lineHeight: '23px',
    color: '#FFFFFF',
  },
}));

function Join(props) {
  const classes = useStyles();
  const { value, onChange, onSubmit } = props;
  return (
    <Box className={classes.container}>
      <input
        type="text"
        placeholder="Email"
        value={value}
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            onSubmit();
          }
        }}
        className={classes.input}
      />
      <Button variant="contained" className={classes.submit} border={0} onClick={onSubmit}>
        <Typography variant="subtitle1" align="center" className={classes.label}>
          Join for free
        </Typography>
      </Button>
    </Box>
  );
}

Join.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Join;
