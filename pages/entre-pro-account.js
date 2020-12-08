import React from 'react';
import Head from 'next/head';
import router from 'next/router';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EntreButton from '../src/components/EntreButton';
import onlyPro from '../src/helpers/onlyPro';

function ThankYouProMonthlyPage() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>Entre: Thank you for being an Entre Pro member</title>
      </Head>
      <Box my={10}>
        <Card>
          <Box m={5}>
            <Box
              mt={[2, 2, 5, 5, 5]}
              mb={[2, 2, 5, 5, 5]}
            >
              <Box align="center">
                <img src="/thank_you.png" alt="Thank You!" width="50%" />
              </Box>
              <Typography variant="h4" align="center">
                Thank you for being an Entre Pro member!
              </Typography>
            </Box>
            <Typography variant="body1" align="center">
              Your name and email will be added to the Entre Pro Database
              and you can attend all our events and access all of our deals for free.
            </Typography>
            <Box mt={2}>
              <Typography variant="body1" align="center">
                Use the code NETWORK20 at any event to get a free ticket.
              </Typography>
            </Box>
            <Box align="center" mt={3}>
              <EntreButton onClick={() => window.open('https://blog.joinentre.com/events', '_blank')}>
                Check Out Our Event Schedule
              </EntreButton>
            </Box>
            <Box align="center" mt={1}>
              <EntreButton onClick={() => router.push('/search?section=deals')}>
                Check Out Our Deals
              </EntreButton>
            </Box>
            <Box align="center" mt={1}>
              <EntreButton onClick={() => window.open('https://www.eventbrite.com/e/entre-pro-mastermind-session-tickets-112220237752?discount=Network20', '_blank')}>
                Sign Up for the next Mastermind session
              </EntreButton>
            </Box>
            {/* <Box align="center" mt={1}>
              <EntreButton onClick={() => window.open('https://3.basecamp.com/4258264/join/6jT7kfuWoa8B', '_blank')}>
                Join the beta testing group
              </EntreButton>
            </Box> */}
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
export default onlyPro(ThankYouProMonthlyPage);
