import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  root: {
    background: '#F3F5F9',
    boxShadow: ' 0px 4px 11px rgba(0, 0, 0, 0.25)',
    borderRadius: '30px',
    paddingBottom: 40,
  },
  grid: {
    width: '100%',
    height: '100%',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    padding: '30px',
    fontFamily: 'Roboto',
    fontSize: '45px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '75px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#272044',
    '@media (max-width:600px)': {
      fontSize: '26px',
      lineHeight: '30px',
      padding: 20,
    },
    '@media (max-width:1280px) and (min-width:600px)': {
      fontSize: '36px',
      lineHeight: '45px',
      padding: 30,
    },
  },
  titleCard: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: '0.03em',
    color: '#414064',
  },
  text: {
    height: '61px',
    width: '293px',
    fontFamily: 'Roboto',
    fontSize: '15px',
    fontStyle: 'normal',
    lineHeight: '21px',
    letterSpacing: '0.01em',
    textAlign: 'center',
  },
  imgNetwork: {
    width: '223px',
    height: '189px',
    paddingButtom: '10px',
  },
}));


function Article() {
  const classes = useStyles();
  return (
    <>
      <Box mt={4} mb={8}>
        <Container className={classes.root}>
          <Grid container className={classes.grid} justify="center">
            <Grid item xs={12}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.title}>
                Why Entre will be your  new  favorite place to hang out
              </Typography>
            </Grid>
            <Grid item md={4} className={classes.gridItem}>
              <CardMedia>
                <img src="/images/people.png" alt="Keep Connecting Virtually" />
              </CardMedia>
              <Typography variant="h6" align="center" color="textPrimary" gutterBottom className={classes.titleCard}>
                Discover
              </Typography>
              <Typography variant="body2" align="center" gutterBottom className={classes.text}>
                Easily search and find who you&apos;re looking for through simple filters
                based on interests, location, and title.
              </Typography>

            </Grid>

            <Grid item md={4} className={classes.gridItem}>
              <CardMedia>
                <img src="/images/network.png" alt="Network" className={classes.imgNetwork} />
              </CardMedia>
              <Typography variant="h6" align="center" color="textPrimary" gutterBottom className={classes.titleCard}>
                Network
              </Typography>
              <Typography variant="body2" align="center" gutterBottom className={classes.text}>
                Instantly meet like-minded people through our on-demand networking,
                rooms and events.
              </Typography>
            </Grid>

            <Grid item md={4} className={classes.gridItem}>
              <CardMedia>
                <img src="/images/chatting.png" alt="networ" />
              </CardMedia>
              <Typography variant="h6" align="center" color="textPrimary" className={classes.titleCard} gutterBottom>
                Communicate
              </Typography>
              <Typography variant="body2" gutterBottom align="center" className={classes.text}>
                Simply follow up, message, and schedule meetings with interesting
                people directly through our app
              </Typography>
            </Grid>


          </Grid>
        </Container>
      </Box>


    </>
  );
}

export default Article;
