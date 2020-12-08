import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import PeopleCard from './PeopleCard';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: 'white',
    boxShadow: 'none',
    // padding: 20,
    marginTop: 0,
  },
}));

const EventAttendeesTab = (props) => {
  const classes = useStyles();
  const { attendees, eventId } = props;
  return (
    <Box>
      <Card className={classes.card}>
        {attendees.map((item, index) => (
          <PeopleCard index={index} post={item} eventId={eventId} />
        ))}
        {attendees.length === 0 ? (
          <Box p={3} mt={2} mb={2}>There are no registered attendees yet</Box>
        ) : null }
      </Card>
    </Box>
  );
};

EventAttendeesTab.propTypes = {
  attendees: PropTypes.array.isRequired,
  eventId: PropTypes.string.isRequired,
};

export default EventAttendeesTab;
