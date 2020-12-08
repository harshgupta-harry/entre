import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  timeTag: {
    backgroundColor: '#00C4FF',
    color: '#FFFFFF',
    fontSize: 17,
    borderRadius: 20,
    padding: '3px 10px',
    marginRight: 10,
    minWidth: 130,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));

const features = [
  { time: '6:00 pm EST', text: 'Event Introduction' },
  { time: '6:15 pm EST', text: 'Startup Pitches + Q&A' },
  { time: '7:30 pm EST', text: 'Winners and Prizes announced + Closing remarks' },
  { time: '7:45 pm EST', text: 'Networking' },
];

export default function Partner() {
  const classes = useStyles();

  return (
    <Box mt={4} mb={[0, 9]}>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <Box mr={3} mb={3}>
            <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
              October 28th.
              <Box display={['none', 'block']} />
              {' '}
              6pm-8pm.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography variant="h6">
            Prize: TBD
          </Typography>
          <Typography variant="body1">
            Free Entre Pro Membership for all finalists.
          </Typography>

          {features.map((feature) => (
            <Box key={feature.time} mt={2} display="flex" justifyContent="flex-start" alignItems="flex-start">
              <Typography className={classes.timeTag}>{feature.time}</Typography>
              <Box ml={2}>
                <Typography variant="body1">{feature.text}</Typography>
                {/* <Typography variant="body2" color="textSecondary">
                      {feature.description}
                    </Typography> */}
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
