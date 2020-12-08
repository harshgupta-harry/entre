import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  secondHeader: {
    marginTop: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.2)',
  },
  cardMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  media: {
    height: '100%',
  },
}));

export default function Partner() {
  const classes = useStyles();
  return (
    <>
      <Box mt={3} mb={3}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Learn from the top experts
        </Typography>
        <Divider />
        <Typography variant="body1" align="center" color="textSecondary" component="p" className={classes.secondHeader}>
          We bring in the top CEO’s, Entrepreneurs, VC’s, Angels, and Executives
          for you to connect with and learn from.
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item key="activities" xs={12} sm={6} md={6}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              component="iframe"
              title="Investor Series with Laura Chau Principal Canaan VC"
              src="https://www.youtube.com/embed/G--0HbzXFdk"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card className={classes.card}>
            <CardMedia className={classes.cardMedia}>
              <img src="/pro/virtual-event.png" alt="Keep Connecting Virtually" className={classes.media} />
            </CardMedia>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
