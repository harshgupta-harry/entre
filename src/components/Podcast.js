/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Box from '@material-ui/core/Box';

const Podcast = () => (
  <Box
    style={{ cursor: 'pointer' }}
    onClick={() => {
      window.open(
        'https://entre.link/podcast',
        '_blank',
      );
    }}
  >
    <img
      width="280px"
      src="/images/entre_podcast.png"
      alt="Entre Mobile Banner"
    />
  </Box>
);

export default Podcast;
