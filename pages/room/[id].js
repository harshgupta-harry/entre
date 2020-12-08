import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import withAuth from '../../src/helpers/withAuth';
import Room from '../../src/components/connect/Room';

function RoomScreen({ id }) {
  if (!id) return null;
  return (
    <Container component="main" maxWidth="lg">
      <Room id={id} />
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

RoomScreen.propTypes = {
  id: PropTypes.string,
};

RoomScreen.defaultProps = {
  id: null,
};

export default withAuth(RoomScreen, { hideNav: true });
