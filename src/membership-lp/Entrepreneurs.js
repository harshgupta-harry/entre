import React from 'react';
import {
  Grid, Typography, makeStyles,
} from '@material-ui/core/';
import Reviews from './Reviews';


const useStyles = makeStyles(() => ({

  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fonFamily: 'Roboto',
    fontSize: '35px',
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: '0em',
    color: '#272044',
    marginBottom: '25px',
    '@media (max-width:600px)': {
      fontSize: '21px',
      lineHeight: '30px',
    },
    '@media (max-width:1280px) and (min-width:600px)': {
      fontSize: '35px',
      lineHeight: '45px',
    },
  },
  textColor: {
    color: '#00C4FF',
  },
  card: {
    width: '359px',
    height: '395px',
    background: 'rgba(93, 197, 241, 0.05)',
    borderRadius: '10px',
    position: 'relative',

  },
  quote: {
    width: '18.9px',
    height: '31.75px',
    marginRight: '6px',
  },
  contentText: {
    maxHeight: '188px',
    width: '100%',
    marginTop: '21px',
  },
  textCard: {
    maxHeight: '188px',
    width: '316px',
    borderRadius: 'nullpx',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '32px',
    color: '#003399',
  },
  pic: {
    width: '46px',
    height: '46px',
    marginLeft: '0',
    marginRight: '10px',
  },
  name: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '15px',
    width: '146px',
    height: '20px',
    color: '#272044',
  },
  cardFooter: {
    width: '316px',
    alignItems: 'center',
  },
  alumnText: {
    color: '#766C9C',
  },


}));
function Entrepreneurs() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body1" color="initial" className={classes.text}>
            Entrepreneurs
            {' '}
            <span className={classes.textColor}>Love our App </span>
          </Typography>

        </Grid>
        <Grid item xs={12}>
          <Reviews />
        </Grid>
      </Grid>
    </>
  );
}


export default Entrepreneurs;
