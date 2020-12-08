/* eslint-disable prefer-spread */
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '../../src/helpers/withAuth';
import Deals from '../../src/components/deals/Deals';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
  },
}));

function DealsScreen() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg" className={classes.container}>
      <Deals />
    </Container>
  );
}
export default withAuth(DealsScreen);
