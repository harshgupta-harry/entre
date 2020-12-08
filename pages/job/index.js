import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import withAuth from '../../src/helpers/withAuth';
import JobList from '../../src/components/jobs/JobList';

function HomeScreen() {
  return (
    <Container component="main" maxWidth="md">
      <Grid container justify="center">
        <Grid item sm={8}>
          <JobList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withAuth(HomeScreen);
