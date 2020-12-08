import React from 'react';
import Container from '@material-ui/core/Container';
import withAuth from '../src/helpers/withAuth';
import MatchMaking from '../src/components/connect/MatchMaking';

function MyTicketsScreen() {
  return (
    <Container component="main" maxWidth="lg">
      <MatchMaking />
    </Container>
  );
}

export default withAuth(MyTicketsScreen, { hideNav: true });
