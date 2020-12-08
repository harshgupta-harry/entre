import Container from '@material-ui/core/Container';
import Head from 'next/head';
import People from '../src/about/People';
import Landing from '../src/about/Landing';
import About from '../src/about/About';
import forAllUsers from '../src/helpers/forAllUsers';

const ProScreen = () => (
  <Container>
    <Head>
      <title>Entre: About</title>
    </Head>
    <Landing />
    <About />
    <People />
  </Container>
);

export default forAllUsers(ProScreen);
