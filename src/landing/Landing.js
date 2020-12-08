import React, { useState } from 'react';
import Img from 'react-cool-img';
import router from 'next/router';
import { useSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Join from './Join';
import api from '../../common/api/newApi';

const useStyles = makeStyles(() => ({
  subtitle: {
    color: '#455880',
  },
  landingTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '63px',
    lineHeight: '76px',
    color: '#003399',
    '@media (max-width:600px)': {
      fontSize: '32px',
      lineHeight: '41px',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeButton: {
    width: '80%',
    maxWidth: 200,
  },
}));

export default function () {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const submitEmailForm = async () => {
    if (!email || email.trim() === '') {
      enqueueSnackbar('Email address is required', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      return;
    }
    await api.get(`user/register-email?email=${encodeURIComponent(email)}`);
    router.push({ pathname: '/upgrade', query: { email } });
  };

  return (
    <Box mt={[2, 8]} mb={[1, 8]}>
      <Grid container spacing={5}>
        <Grid item xs={false} sm={7} md={7}>
          <Box ml={[1, 5]}>
            <Typography variant="h1" className={classes.landingTitle}>
              The Most Powerful Networking Platform For Entrepreneurs
            </Typography>
            <Box mt={2}>
              <Typography variant="body1" className={classes.subtitle}>
                Easily meet like-minded people from your phone or desktop
              </Typography>
            </Box>
            <Box mt={2}>
              <Join
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onSubmit={submitEmailForm}
              />
            </Box>
          </Box>
        </Grid>
        <Grid container item xs={12} sm={5} md={5}>
          <Box>
            <Img
              width="100%"
              alt="Networking Event"
              src="/images/landing_first.png"
              title="Networking Event"
            />
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <a
                className={classes.center}
                href="http://entre.link/homepage"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className={classes.storeButton}
                  src="/google-play-badge.png"
                  alt="Entre Logo"
                />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a
                className={classes.center}
                href="http://entre.link/homepage"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className={classes.storeButton}
                  src="/app-store-badge.png"
                  alt="Entre Logo"
                />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
