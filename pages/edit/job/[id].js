import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import withAuth from '../../../src/helpers/withAuth';
import NewJob from '../../../src/components/new/NewJob';

function NewJobScreen({ id }) {
  return (
    <Container component="main" maxWidth="md">
      <Head>
        <title>
          Entre: Edit Job
        </title>
      </Head>
      <Box marginTop="40px">
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <NewJob id={id} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}

NewJobScreen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withAuth(NewJobScreen);
