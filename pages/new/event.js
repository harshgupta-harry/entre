import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import withAuth from '../../src/helpers/withAuth';
import NewEvent from '../../src/components/new/NewEvent';

function NewEventScreen() {
  return (
    <Container component="main" maxWidth="md">
      <Head>
        <title>
          Entre: New Event
        </title>
      </Head>
      <Box marginTop="40px">
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <NewEvent />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default withAuth(NewEventScreen);
