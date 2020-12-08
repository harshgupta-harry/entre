import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function () {
  return (
    <>
      <Box mb={[1, 6]}>
        <Card>
          <CardMedia
            component="img"
            alt="Summit Event"
            image="/images/pitch/pitchbanner.jpeg"
            title="Summit Event"
          />
        </Card>
        <Typography variant="h5">Join Entre for a virtual Startup Pitch Competition!</Typography>
      </Box>
      <Box mt={[1, 2]} mr={[1, 3]} mb={3}>
        <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
          About this Event
        </Typography>
        <Box>
          <Typography variant="body1" align="left" color="textSecondary">
            This is an Online Event via Zoom.
          </Typography>
        </Box>
        <Box mt={2} mr={[0, 10]}>
          <Typography variant="body1" align="left">
            Join Entre virtually for our Startup Pitch Competition. 6 startups will pitch to a
            panel of investor judges and hundreds of entrepreneurs.
          </Typography>
        </Box>
        <Box mt={2} mr={[0, 10]}>
          <Typography variant="body1" align="left">
            <a href="https://forms.gle/HozE6cqJ2326zkPLA" target="_blank" rel="noreferrer">
              Apply here in the google form to Pitch at the event!
            </a>
            {' '}
            Selected applicants will be
            contacted further by our team. Deadline to apply is October 21, 2020 at midnight.
          </Typography>
        </Box>
        <Box mt={2} mr={[0, 10]}>
          <Typography variant="body1" align="left">
            <strong>Subscribe to Entre Pro Membership</strong>
            {' '}
            to get FREE access to attend this event + all
            our upcoming events and also
            {' '}
            <a href="http://joinentre.com/search#type=deals">enjoy exclusive deals and benefits.</a>
            {' '}
            Learn more at
            {' '}
            <a href="http://joinentre.com/pro">JoinEntre.com/pro</a>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
