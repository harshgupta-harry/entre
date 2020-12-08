import React from 'react';
import Container from '@material-ui/core/Container';
import withAuth from '../src/helpers/withAuth';
import Tickets from '../src/components/tickets/Tickets';

function MyTicketsScreen() {
  return (
    <Container component="main" maxWidth="lg">
      <Tickets />
    </Container>
  );
}

export default withAuth(MyTicketsScreen);
