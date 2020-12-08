import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import EntreButton from '../EntreButton';
import EntreCardHeader from '../EntreCardHeader';
import { setFilters, updateUserConnection } from '../../../common/data/actions';
import PeopleMenu from './PeopleMenu';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    marginBottom: '10px',
  },
  detail: {
    cursor: 'auto',
  },
  listItem: {
    display: 'flex',
    margin: '3px 0px',
  },
  listIcon: {
    fontSize: 20,
    color: '#00C4FF',
  },
  listItemText: {
    fontSize: 16,
    color: '#9F9F9F',
    marginLeft: 3,
    marginTop: 0,
    marginBottom: 0,
  },
  locationLink: {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: 15,
    color: '#51caf9',
    padding: 0,
  },
}));

const PeopleCard = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector((state) => state.account.user);
  const { post, detail } = props;
  const [$connectionStatus = post.connectionStatus, setConnectionStatus] = useState();

  let locationText = '';
  if (post.location && post.location.city && post.location.state && post.location.country) {
    locationText = `${post.location.city}, ${post.location.state}, ${post.location.country}`;
  }

  const updateConnection = async (e) => {
    e.stopPropagation();
    const action = dispatch(updateUserConnection(post.id, post.connectionStatus));
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
  };

  const renderConnectionButton = () => (
    <Box display="flex" height="60px" alignItems="center">
      <EntreButton
        type="submit"
        size="large"
        variant={$connectionStatus === 'Connect' ? 'outlined' : 'contained'}
        color="primary"
        onClick={updateConnection}
        className={classes.submit}
      >
        {$connectionStatus}
      </EntreButton>
      <PeopleMenu account={post} userId={post.id} />
    </Box>
  );

  const userLocationFilter = (city, state, country) => {
    const locResult = {
      city,
      state,
      country,
    };
    dispatch(setFilters({
      section: 'events',
      location: locResult,
    }));
  };

  const locationOnClick = (event) => {
    event.stopPropagation();
    if (post) {
      userLocationFilter(
        post.location.city ? post.location.city : '',
        post.location.state ? post.location.state : '',
        post.location.country ? post.location.country : '',
      );
    }
  };

  return (
    <Card className={clsx(classes.root, detail && classes.detail)}>
      <EntreCardHeader
        author={post}
        title={post.title ? post.title.join(' | ') : ''}
        subtitle={locationText
          ? (
            <button type="button" className={classes.locationLink} onClick={locationOnClick}>
              {locationText}
            </button>
          )
          : null}
        action={currentUser.id !== post.userId && renderConnectionButton()}
      />
    </Card>
  );
};

PeopleCard.propTypes = {
  post: PropTypes.object,
  detail: PropTypes.bool,
};

PeopleCard.defaultProps = {
  post: {},
  detail: false,
};

export default React.memo(PeopleCard);
