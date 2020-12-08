import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Img from 'react-cool-img';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Linkify from 'linkifyjs/react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: 'white',
    boxShadow: 'none',
    padding: 20,
    marginTop: 0,
  },
  timeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  locationIcon: {
    width: 15,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
}));

const EventAboutTab = (props) => {
  const classes = useStyles();
  const { post } = props;
  const ticketing = (post && post.ticketing);

  return (
    <Card className={classes.card}>
      { !ticketing ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" align="left" color="textPrimary">
              Date
            </Typography>
            <Box mt={1}>
              <Typography variant="body2">
                <Img src="/icons/calendar.png" alt="calendar" className={classes.timeIcon} />
                {post.startDateTime !== null ? `${moment(post.startDateTime)
                  .format('MMMM Do')} at ${moment(post.startDateTime)
                  .format('hh:mm a')}` : 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : null }
      {post.address
        ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" align="left" color="textPrimary">
                Address
              </Typography>
              <Typography variant="body2">
                <Img
                  src="/icons/location_new.png"
                  alt="calender"
                  className={classes.locationIcon}
                />
                {post.address}
              </Typography>
            </Grid>
          </Grid>
        )
        : null}
      {/* {post.eventUrl
        ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" align="left" color="textPrimary">
                Broadcast Url
              </Typography>
              <Typography variant="body2">
                <Img
                  src="/icons/location_new.png"
                  alt="calender"
                  className={classes.locationIcon}
                />
                <Linkify>{post.eventUrl}</Linkify>
              </Typography>
            </Grid>
          </Grid>
        )
        : null} */}
      {post.registrationUrl && !ticketing
        ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" align="left" color="textPrimary">
                Registration Link
              </Typography>
              <Box mt={1}>
                <Typography variant="body2">
                  <Img
                    src="/icons/location_new.png"
                    alt="calender"
                    className={classes.locationIcon}
                  />
                  <Linkify>{post.registrationUrl}</Linkify>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )
        : null}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" align="left" color="textPrimary">
            Description
          </Typography>
          <Box mt={1}>
            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
              <Linkify>{post.description}</Linkify>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

EventAboutTab.propTypes = {
  post: PropTypes.object.isRequired,
};

export default EventAboutTab;
