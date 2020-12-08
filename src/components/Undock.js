/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Box from '@material-ui/core/Box';

const Undock = () => (
  <Box
    style={{ cursor: 'pointer' }}
    onClick={() => {
      window.open(
        'https://undock.com/',
        '_blank',
      );
    }}
  >
    <img
      width="280px"
      src="/images/undock.jpg"
      alt="Undock"
    />
  </Box>
);

export default Undock;
