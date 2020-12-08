import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import withAuth from '../../src/helpers/withAuth';
import PostFeed from '../../src/components/feed/PostFeed';
import ComingSoonCard from '../../src/components/ComingSoon';
import BecomeProCard from '../../src/components/BecomePro';
// import PodcastCard from '../../src/components/Podcast';
import WefunderCard from '../../src/components/Wefunder';
import UndockCard from '../../src/components/Undock';
import ShortCutsCard from '../../src/components/ShortCutsCard';
import FooterSmall from '../../src/components/FooterSmall';
import EntreTabs from '../../src/components/EntreTabs';

const sections = [
  {
    title: 'For You',
    component: (
      <>
        <Head>
          <title>
            Entre: Feed - For You
          </title>
        </Head>
        <PostFeed filter="foryou" />
      </>
    ),
  },
  {
    title: 'Connections',
    component: (
      <>
        <Head>
          <title>
            Entre: Feed - Connections
          </title>
        </Head>
        <PostFeed filter="connections" />
      </>
    ),
  },
  {
    title: 'Newest',
    component: (
      <>
        <Head>
          <title>
            Entre: Feed - Newest
          </title>
        </Head>
        <PostFeed filter="newest" />
      </>
    ),
  },
].filter((s) => !s.hide);


function HomeScreen() {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3} justify="center">
        <Grid item sm={2} md={3}>
          <Box
            mt={6}
            position="fixed"
            width="290px"
            display={['none', 'none', 'none', 'block', 'block']}
          >
            <ShortCutsCard />
          </Box>
        </Grid>
        <Grid item sm={8} md={6}>
          <EntreTabs fullWidth tabs={sections} style={{ width: '80%', margin: '-15px auto 0' }} />
        </Grid>
        <Grid item sm={2} md={3}>
          <Box
            mt={6}
            position="fixed"
            width="280px"
            display={['none', 'none', 'none', 'block', 'block']}
          >
            <UndockCard />
            <WefunderCard />
            <ComingSoonCard />
            <BecomeProCard />
            <FooterSmall />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withAuth(HomeScreen);
