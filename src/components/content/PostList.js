import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Card, Box, Button, Typography,
} from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import PostCard from './PostCard';
import {
  loadPosts,
  resetPosts,
  setFilters,
} from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  noContent: {
    textAlign: 'center',
  },
}));

const PostList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.home.posts);
  const loadingPosts = useSelector((state) => state.home.loadingPosts);
  const hasMorePosts = useSelector((state) => state.home.hasMorePosts);
  const search = useSelector((state) => state.search);
  const pageSize = 10;

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(loadPosts(pageSize, 0, search));
  }, [search]);

  const fetchPosts = useCallback((p) => {
    dispatch(loadPosts(pageSize, (p - 1) * pageSize, search));
  }, [search]);

  const setFilter = (contentFilter) => {
    dispatch(setFilters({
      section: 'people',
      contentFilter,
    }));
  };

  const renderFilters = () => (
    <Card style={{ width: '100%', marginBottom: 10 }}>
      <Box flex={1} margin="5px">
        <Button onClick={() => setFilter('newest')}>
          <FiberNewIcon style={{ color: search.contentFilter === 'newest' ? '#51caf9' : '#BDBDBD', marginRight: 10 }} />
          <Typography
            variant="body2"
            style={{
              textTransform: 'capitalize',
              color: search.contentFilter === 'newest' ? '#51caf9' : '#BDBDBD',
            }}
          >
            newest
          </Typography>
        </Button>
        <Button onClick={() => setFilter('trending')}>
          <TrendingUpIcon style={{ color: search.contentFilter === 'trending' ? '#51caf9' : '#BDBDBD', marginRight: 10 }} />
          <Typography
            variant="body2"
            style={{
              textTransform: 'capitalize',
              color: search.contentFilter === 'trending' ? '#51caf9' : '#BDBDBD',
            }}
          >
            trending
          </Typography>
        </Button>
        <Button onClick={() => setFilter('popular')}>
          <WhatshotIcon style={{ color: search.contentFilter === 'popular' ? '#51caf9' : '#BDBDBD', marginRight: 10 }} />
          <Typography
            variant="body2"
            style={{
              textTransform: 'capitalize',
              color: search.contentFilter === 'popular' ? '#51caf9' : '#BDBDBD',
            }}
          >
            Popular
          </Typography>
        </Button>
      </Box>
    </Card>
  );

  const renderLoader = () => (
    <>
      { renderFilters() }
      <div className={classes.loader}><CircularProgress /></div>
    </>
  );

  const renderEmptyResults = () => (
    <>
      { renderFilters() }
      <div className={classes.noContent}>There are no posts that match the filters</div>
    </>
  );

  if (posts.length === 0 && loadingPosts) return renderLoader();
  if (posts.length === 0 && !loadingPosts) return renderEmptyResults();

  return (
    <>
      { renderFilters() }
      <InfiniteScroll
        style={{ width: '100%' }}
        pageStart={1}
        loadMore={fetchPosts}
        hasMore={hasMorePosts && !loadingPosts}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      { loadingPosts ? <div className={classes.loader}><CircularProgress /></div> : null }
    </>
  );
};

export default PostList;
