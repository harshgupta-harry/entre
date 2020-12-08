import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import onlyPro from '../../src/helpers/onlyPro';
import DealDetails from '../../src/components/deals/DealDetails';

function DealScreen(props) {
  const { id } = props;

  return (
    <Container component="main" maxWidth="md">
      <DealDetails id={id} />
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

DealScreen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default onlyPro(DealScreen);
