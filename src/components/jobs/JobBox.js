/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Typography, Card, CardContent,
} from '@material-ui/core';
import EntreButton from '../EntreButton';

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    marginBottom: 10,
  },
}));

function TicketBox(props) {
  const {
    ticket: {
      ticket, event,
    },
  } = props;
  const classes = useStyles();

  const viewEvent = () => {
    window.open(
      event.landing,
      '_blank',
    );
  };

  const joinEvent = () => {
    window.open(
      event.url,
      '_blank',
    );
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box mb={1}>
          <Typography variant="h3">
            Event:
            {' '}
            {event.title}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="body2">
            Ticket:
            {' '}
            {ticket.name}
            {' '}
            -
            {' '}
            {ticket.description}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="body2">
            Date:
            {' '}
            {event.date}
            {' '}
            Time:
            {' '}
            {event.time}
          </Typography>
        </Box>
        <Box mt={1}>
          <EntreButton
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={viewEvent}
          >
            View Event
          </EntreButton>
          <EntreButton
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={joinEvent}
          >
            Join Zoom
          </EntreButton>
        </Box>
      </CardContent>
    </Card>
  );
}

TicketBox.propTypes = {
  ticket: PropTypes.object.isRequired,
};

TicketBox.defaultProps = {
};

export default TicketBox;
