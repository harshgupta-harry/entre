import React from 'react';
import router from 'next/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import EntreButton from './EntreButton';
// import FullWidthTabs from '../index/Tab';

function SignInCard() {
  return (
    <Card>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h3">You&apos;re signed out</Typography>
        <Typography variant="body2">Sign in for the full experience</Typography>
        <Box align="center" mt={1}>
          {/* <FullWidthTabs /> */}
          <EntreButton variant="contained" size="small" fullWidth onClick={() => router.push('/')}>
            Log In / Sign Up
          </EntreButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SignInCard;
