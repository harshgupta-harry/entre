import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import withAuth from '../../src/helpers/withAuth';
import PostList from '../../src/components/companies/PostList';

function HomeScreen() {
  return (
    <Container component="main" maxWidth="md">
      <Grid container justify="center">
        <Grid item sm={8}>
          <PostList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withAuth(HomeScreen);
