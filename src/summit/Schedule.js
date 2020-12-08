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
    minWidth: 110,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));

const features = [
  { time: '11AM EST', text: 'Venture Capital Panel', description: 'Mac the VC, Sahil, Elizabeth Yin, Lolita.' },
  { time: '12PM EST', text: 'Digital Marketing', description: 'Brandon Adams, Conor Paulsen, Neil Patel, Evan Carmichael, Online Geniuses(david). ' },
  { time: '1PM EST', text: 'Networking', description: 'Alexandra Fusulo, Fiverr, Upwork' },
  { time: '3PM EST', text: 'SAAS Panel', description: 'Jason Lemkin, Adalo, Bubble, Bildr, BloomVP, Nathan Latka.' },
  { time: '4PM EST', text: 'Pitch competition', description: 'David Meltzer, AJ Vaynerchuk' },
  { time: '5PM EST', text: 'Closing & Networking' },
];

export default function Partner() {
  const classes = useStyles();

  return (
    <Box mt={4} mb={[0, 9]}>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <Box mr={3} mb={3}>
            <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
              November 20th.
              <br />
              11am-6pm.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography variant="body1">
            The online entrepreneurship event of the year.
            A virtual event like you&apos;ve never seen before.
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
