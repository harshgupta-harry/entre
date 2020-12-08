import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import withAuth from '../../src/helpers/withAuth';
import NewPost from '../../src/components/new/NewPost';

function NewPostScreen() {
  return (
    <Container component="main" maxWidth="md">
      <Head>
        <title>
          Entre: New Post
        </title>
      </Head>
      <Box marginTop="40px">
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <NewPost />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default withAuth(NewPostScreen);
