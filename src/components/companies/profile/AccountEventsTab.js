import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventCard from '../../events/EventCard';
import { loadCompanyEvents } from '../../../../common/data/actions';

const AccountEventsTab = (props) => {
  const dispatch = useDispatch();
  const { loadUsername } = props;
  const loadingPosts = useSelector((state) => state.events.loadingPosts);
  const events = useSelector((state) => state.events.posts);

  useEffect(() => {
    if (loadUsername) {
      dispatch(loadCompanyEvents(loadUsername));
    }
  }, [loadUsername]);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const renderLoader = () => (
    <div style={loaderStyle}><CircularProgress /></div>
  );
  if (events.length === 0 && loadingPosts) return renderLoader();
  if (events.length === 0 && !loadingPosts) return <div>No posts</div>;
  return (
    <>
      {!loadingPosts && events.map((post) => (
        <EventCard key={post.id} post={post} />
      ))}
    </>
  );
};

AccountEventsTab.propTypes = {
  loadUsername: PropTypes.string.isRequired,
};

export default AccountEventsTab;
