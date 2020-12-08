import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import utilStyles from '../../styles/utils.module.css';
import theme from '../theme';

const useStyles = makeStyles(() => ({
  h1: {
    color: '#00CAFF',
    fontSize: '2rem',
    '@media (min-width:600px)': {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '4rem',
    },
  },
  slimH1: {
    fontWeight: 'normal',
  },
  root: {
    marginTop: 64,
    marginBottom: 64,
  },
  hr: {
    margin: '30px 0',
  },
  cardMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
  },
}));

export default function () {
  const classes = useStyles();
  return (
    <Container component="main" className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={false} sm={4} md={5}>
          <Typography variant="h1" className={`${utilStyles.gradientTitle} ${classes.h1}`}>
            This is Entre
          </Typography>
          <Divider className={classes.hr} />
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <Card>
            <CardMedia
              className={classes.cardMedia}
              component="iframe"
              title="Entre | Community for Entrepreneurs"
              src="https://www.youtube.com/embed/sm41CZri5vM"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
