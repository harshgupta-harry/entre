import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import EntreButton from '../components/EntreButton';
import utilStyles from '../../styles/utils.module.css';

const useStyles = makeStyles(() => ({
  title: {
    background: '-webkit-linear-gradient(#eee, #333)',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: '-webkit-text-fill-color: transparent',
  },
  hr: {
    margin: '30px 0',
  },
}));

export default function () {
  const classes = useStyles();
  return (
    <Box mt={[2, 8]} mb={[1, 8]}>
      <Grid container spacing={5}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={5}>
          <Typography variant="h1" className={utilStyles.gradientTitle}>
            Entre Pro Membership
          </Typography>
          <Divider className={classes.hr} />
          <Typography variant="body1" color="textSecondary" component="p">
            Attend all of our events and get exclusive deals for a full year.
          </Typography>
          <Box textAlign="center" mt={2}>
            <EntreButton
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                const top = document.getElementById('pricing').offsetTop;
                window.scrollTo(0, top);
              }}
            >
              Get Started
            </EntreButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <Card>
            <CardMedia
              component="img"
              alt="Networking Event"
              image="/images/pro_membership_banner.png"
              title="Networking Event"
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
