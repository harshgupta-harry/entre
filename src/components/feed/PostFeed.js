import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
} from '@material-ui/core';
import PostCard from '../content/PostCard';
import EventCard from '../events/EventCard';
import {
  loadFeed,
  resetFeed,
} from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContent: {
    textAlign: 'center',
  },
}));

const PostFeed = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.home.feed);
  const loadingFeed = useSelector((state) => state.home.loadingFeed);
  const hasMoreFeed = useSelector((state) => state.home.hasMoreFeed);
  const pageSize = 10;
  const { filter } = props;

  useEffect(() => {
    dispatch(resetFeed());
    dispatch(loadFeed(pageSize, 0, {
      feedFilter: filter,
    }));
  }, [filter]);

  const fetchPosts = useCallback((p) => {
    dispatch(loadFeed(pageSize, (p - 1) * pageSize, {
      feedFilter: filter,
    }));
  }, []);

  const renderEmptyResults = () => (
    <>
      <div className={classes.noContent}>There are no posts that match the filters</div>
    </>
  );

  const renderLoader = () => (
    <div className={classes.loader}><CircularProgress /></div>
  );

  if (feed.length === 0 && loadingFeed) return renderLoader();
  if (feed.length === 0 && !loadingFeed) return renderEmptyResults();

  return (
    <>
      <InfiniteScroll
        style={{ width: '100%' }}
        pageStart={1}
        loadMore={fetchPosts}
        hasMore={hasMoreFeed && !loadingFeed}
      >
        {feed.map((post) => {
          if (post.postDate) {
            return <PostCard key={post.id} post={post} />;
          }
          return <EventCard key={post.id} post={post} />;
        })}
      </InfiniteScroll>
      { loadingFeed ? <div className={classes.loader}><CircularProgress /></div> : null }
    </>
  );
};

PostFeed.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default PostFeed;
