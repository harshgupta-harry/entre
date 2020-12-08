import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventCard from './EventCard';
import {
  loadEventPosts,
  resetEventPosts,
} from '../../../common/data/actions';

const EventList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.events.posts);
  const loadingPosts = useSelector((state) => state.events.loadingPosts);
  const hasMorePosts = useSelector((state) => state.events.hasMorePosts);
  const search = useSelector((state) => state.search);
  const pageSize = 10;

  useEffect(() => {
    dispatch(resetEventPosts());
    dispatch(loadEventPosts(pageSize, 0, search));
  }, [search]);

  const fetchPosts = useCallback((p) => {
    dispatch(loadEventPosts(pageSize, (p - 1) * pageSize, search));
  }, [search]);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const renderLoader = () => (
    <div style={loaderStyle}><CircularProgress /></div>
  );

  if (posts.length === 0 && loadingPosts) return renderLoader();
  if (posts.length === 0 && !loadingPosts) return <div>No posts</div>;
  return (
    <>
      <InfiniteScroll
        style={{ width: '100%' }}
        pageStart={1}
        loadMore={fetchPosts}
        hasMore={hasMorePosts && !loadingPosts}
      >
        {posts.map((post) => (
          <EventCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      { loadingPosts ? renderLoader() : null }
    </>
  );
};

export default EventList;
