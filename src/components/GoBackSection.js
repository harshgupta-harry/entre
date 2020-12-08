import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import router from 'next/router';
import Button from '@material-ui/core/Button';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
    border: '0 solid #000',
    boxShadow: 'none',
    cursor: 'pointer',
  },
}));

function GoBackSection() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        size="large"
        className={classes.backButton}
        startIcon={<ArrowBackIosIcon />}
        onClick={() => router.back()}
      >
        Back
      </Button>
    </div>
  );
}

export default GoBackSection;
