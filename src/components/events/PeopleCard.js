import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import EntreButton from '../EntreButton';
import EntreCardHeader from '../EntreCardHeader';
import { loadEventAttendees, updateUserConnection } from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: 'none',
    // boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    marginBottom: '0px',
  },
  detail: {
    cursor: 'auto',
  },
  listItem: {
    display: 'flex',
    margin: '3px 0px',
  },
  listIcon: {
    fontSize: 22,
    color: '#00C4FF',
  },
  listItemText: {
    fontSize: 16,
    color: '#9F9F9F',
    marginLeft: 6,
    marginTop: 0,
    marginBottom: 0,
  },
}));

const PeopleCard = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.account.user);
  const classes = useStyles();
  const { post, eventId } = props;

  const [$connectionStatus = post.connectionStatus, setConnectionStatus] = useState();

  let locationText = '';
  if (post.location && post.location.city && post.location.state && post.location.country) {
    locationText = `${post.location.city}, ${post.location.state}, ${post.location.country}`;
  }

  const updateConnection = async () => {
    const action = dispatch(updateUserConnection(post.userId, post.connectionStatus));
    const res = await action.payload;
    setConnectionStatus(res.sucessStatus);
    enqueueSnackbar(res.message, {
      variant: 'success',
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
    dispatch(loadEventAttendees(eventId));
  };

  const renderConnectionButton = () => (
    <Box display="flex" height="60px" alignItems="center">
      <EntreButton
        type="submit"
        size="large"
        variant="contained"
        color="primary"
        onClick={updateConnection}
        className={classes.submit}
      >
        {$connectionStatus}
      </EntreButton>
    </Box>
  );

  return (
    <Card className={clsx(classes.root)}>
      <EntreCardHeader
        author={post}
        title={post.title ? post.title.join(' | ') : ''}
        subtitle={locationText}
        action={currentUser.id !== post.userId && renderConnectionButton()}
      />
    </Card>
  );
};

PeopleCard.propTypes = {
  post: PropTypes.object,
  eventId: PropTypes.string.isRequired,
};

PeopleCard.defaultProps = {
  post: {},
};

export default React.memo(PeopleCard);
