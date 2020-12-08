import React from 'react';
import { Box } from '@material-ui/core';
import useStyles from './Styles';

const Welcome = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.h1}>
        Welcome!
        {' '}
        <span role="img" aria-labelledby="hello">👋</span>
      </div>
      <div className={classes.instructions}>
        Thank you for joining. We are so happy to have you in our
        community. Reach out to our support if you have any questions.
      </div>
      <Box
        ml={[0, 0, 6, 6, 10]}
        mt={[0, 0, 6, 6, 10]}
        alignItems="center"
        display={['none', 'none', 'block', 'block', 'block']}
      >
        <img
          width="65%"
          src="/celebration.svg"
          alt="Celebration"
        />
      </Box>
    </div>
  );
};

export default Welcome;
