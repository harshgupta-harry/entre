import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({
  listItemText: {
    fontSize: 18,
    display: 'inline-block',
    margin: '10px 5px',
    textAlign: 'left',
  },
  listIcon: {
    color: '#00C4FF',
    fontSize: 30,
    display: 'inline-block',
    margin: 5,
  },
  listItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
}));

const features = [
  'Live Start-Up Pitch Competition',
  '20+ Powerful Entrepreneurs & Expert Speakers',
  'Live Virtual Networking Sessions',
];

export default function Partner() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={8}>
        <Box mt={2} mr={3} mb={3}>
          <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
            Our Virtual Event Overview
          </Typography>
          <Box mr={10}>
            <Typography variant="body1" align="left" color="textSecondary">
              Entre-preneur Summit will stream hyper-focused speeches, workshops and live Q&A
              sessions to help take your business to the next level.
            </Typography>
          </Box>
        </Box>
        {features.map((description) => (
          <Box key={description} mt={2} display="flex" justifyContent="flex-start" alignItems="center">
            <CheckCircleIcon className={classes.listIcon} />
            <Typography variant="body1">{description}</Typography>
          </Box>
        ))}
      </Grid>
      <Grid item sm={4}>
        <Box mt={[2, 0]}>
          <Card>
            <CardMedia
              component="img"
              alt="Summit Event"
              image="/images/presenting.png"
              title="Summit Event"
            />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
