import React from 'react';

const BGImage = () => (
  <div
    style={{
      background: 'url(bg-wave.svg) no-repeat bottom center fixed',
      backgroundSize: 'contain',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: -1,
    }}
  />
);

export default BGImage;
