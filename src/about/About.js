import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  root: {
    marginTop: 64,
    marginBottom: 64,
  },
  hr: {
    marginBottom: 50,
  },
  cardMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
}));

export default function () {
  const classes = useStyles();
  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            About Entre
          </Typography>
        </Container>
        <Divider />
      </div>
      <div>
        <Typography variant="body1" color="textSecondary" component="p">
          Entre is a social network for entrepreneurs and the future of work.
          We have created the hub for a new economy to connect, learn, and build.
          With our app, we combine the industries of social networking, e-learning,
          and business software to give entrepreneurs, startups, and freelancers of
          all types one place to start and grow their businesses and personal lives.
        </Typography>
        <br />
        <Typography variant="body1" color="textSecondary" component="p">
          We are open-sourcing Entrepreneurship with a holistic approach
          that gives everyone the support and community they need to strive
          for greatness with self-care and wellness at the core of what we do
          for a new economy to connect, learn, and build. With our app, we
          combine the industries of social networking, e-learning, and business
          software to give entrepreneurs, startups, and freelancers of all types
          one place to start and grow their businesses and personal lives.
        </Typography>
        <br />
        <Typography variant="body1" color="textSecondary" component="p">
          Our platform is designed to promote economic opportunity for our users
          by enabling you and millions of other entrepreneurs, freelancers,
          and investors to meet, exchange ideas, learn, and find opportunities,
          work, and make decisions in a network of trusted relationships.
          {' '}
          <Typography />
          <br />
          <Typography variant="body1" color="textSecondary" component="p">
            Our mission is simple, build the largest network of entrepreneurs.
          </Typography>
        </Typography>
      </div>
    </Container>
  );
}
