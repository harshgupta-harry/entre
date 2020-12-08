import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import forAllUsers from '../src/helpers/forAllUsers';
import Schedule from '../src/summit/Schedule';
import Overview from '../src/summit/Overview';
import Landing from '../src/summit/Landing';
import Event from '../src/summit/Event';
import EntreTickets from '../src/components/EntreTickets';
// import EntreBecomeProCard from '../src/components/EntreBecomeProCard';

const SummitScreen = () => (
  <Container component="main">
    <Head>
      <title>Entre: Entre-preneur Summit</title>
    </Head>
    <Grid container spacing={2} justify="center" style={{ marginTop: 16 }}>
      <Grid item xs={12} md={9}>
        <Landing />
        <Overview />
        <Event />
        <Schedule />
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          position={['unset', 'unset', 'unset', 'fixed', 'fixed']}
          maxWidth="296px"
          mr={[0, 0, 2]}
        >
          <EntreTickets event="Summit11-20-20" />
        </Box>
      </Grid>
    </Grid>
  </Container>
);
export default forAllUsers(SummitScreen, { hideChat: true, hideGoToMobile: true });
