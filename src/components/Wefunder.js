/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Box from '@material-ui/core/Box';

const Wefunder = () => (
  <Box
    style={{ cursor: 'pointer' }}
    onClick={() => {
      window.open(
        'https://wefunder.com/entre',
        '_blank',
      );
    }}
  >
    <img
      width="280px"
      src="/images/wefunder.png"
      alt="Wefunder"
    />
  </Box>
);

export default Wefunder;
