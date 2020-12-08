import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import forAllUsers from '../src/helpers/forAllUsers';
import Schedule from '../src/pitch/Schedule';
import Landing from '../src/pitch/Landing';
import EntreTickets from '../src/components/EntreTickets';
import EntreBecomeProCard from '../src/components/EntreBecomeProCard';

const PitchScreen = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.account.user);

  const renderBecomeAPro = () => (token && user && user.isPro ? null : (
    <EntreBecomeProCard />
  ));

  return (
    <Container component="main">
      <Head>
        <title>Entre: Startup Pitch Competition</title>
      </Head>
      <Grid container spacing={2} justify="center" style={{ marginTop: 16 }}>
        <Grid item xs={12} md={9}>
          <Hidden mdUp>
            <EntreTickets event="Pitch10-28-20" />
          </Hidden>
          <Landing />
          <Schedule />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            position={['unset', 'unset', 'unset', 'fixed', 'fixed']}
            maxWidth="296px"
            mr={[0, 0, 2]}
          >
            <Hidden smDown>
              <EntreTickets event="Pitch10-28-20" />
            </Hidden>
            { renderBecomeAPro() }
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default forAllUsers(PitchScreen, { hideChat: true, hideGoToMobile: true });
