import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import forAllUsers from '../src/helpers/forAllUsers';
import Landing from '../src/landing/Landing';
import Article from '../src/landing/Article';
import Companies from '../src/landing/Companies';

const LandingScreen = () => (
  <Container>
    <Head>
      <title>Entre: The Most Powerful Networking Platform For Entrepreneurs</title>
    </Head>
    <Box
      ml={[1, 3, 6, 6, 6]}
      style={{
        padding: '10px 0 10px 0',
        height: '70px',
        cursor: 'pointer',
        marginTop: 20,
      }}
    >
      <img alt="entre" style={{ height: '100%' }} src="/logo.png" />
    </Box>
    <Landing />
    <Companies />
    <Article />
  </Container>
);

export default forAllUsers(LandingScreen, { hideNav: true, hideChat: true });
