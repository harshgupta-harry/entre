import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 0),
  },
  secondHeader: {
    marginTop: 20,
    marginLeft: '15%',
    marginRight: '15%',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  title: {
    color: '#0167CC',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,
  },
  media: {
    maxHeight: 300,
    borderRadius: 20,
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.2)',
    maxWidth: '100%',
  },
  cardContent: {
    flexGrow: 1,
    padding: 24,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Partner() {
  const classes = useStyles();

  return (
    <>
      <Box mt={[2, 8]} mb={[1, 8]}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Learn from the top experts
        </Typography>
        <Divider />
        <Typography variant="body1" align="center" color="textSecondary" component="p" className={classes.secondHeader}>
          We bring in the top CEO’s, Entrepreneurs, VC’s, Angels, and Executives
          for you to connect with and learn from.
        </Typography>
      </Box>
      <Box mt={[2, 8]} mb={[1, 8]}>
        <Grid container spacing={3}>
          <Grid item key="activities" xs={12} sm={6} md={6}>
            <CardMedia className={classes.cardMedia}>
              <img src="/images/pro_video_image.png" alt="Keep Connecting Virtually" className={classes.media} />
            </CardMedia>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardMedia className={classes.cardMedia}>
              <img src="/pro/virtual-event.png" alt="Keep Connecting Virtually" className={classes.media} />
            </CardMedia>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
