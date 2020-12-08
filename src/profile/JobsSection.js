import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../common/api';
import JobCard from '../components/jobs/JobCard';

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

const ContentList = (props) => {
  const classes = useStyles();
  const { userId } = props;
  const [posts = [], setPosts] = useState();
  const [loadingPosts = false, setLoadingPosts] = useState();
  const [hasMorePosts = false, setHasMorePosts] = useState();
  const pageSize = 10;

  async function fetchUserPosts(limit = pageSize, offset = 0) {
    setLoadingPosts(true);
    const resp = await api.get(`job/search?userId=${userId}&limit=${limit}&offset=${offset}`, {});
    const { data } = resp.data;
    if (data && data.length) {
      setPosts([...posts, ...data]);
      setHasMorePosts(data.length === 10);
      setLoadingPosts(false);
    }
  }

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchPosts = useCallback((p) => {
    fetchUserPosts(pageSize, (p - 1) * pageSize);
  }, [posts]);

  const renderLoader = () => (
    <div className={classes.loader}><CircularProgress /></div>
  );

  const renderEmptyResults = () => (
    <div className={classes.noContent}>There are no posts that match the filters</div>
  );

  if (posts.length === 0 && loadingPosts) return renderLoader();
  if (posts.length === 0 && !loadingPosts) return renderEmptyResults();

  return (
    <>
      <InfiniteScroll
        style={{ width: '100%' }}
        pageStart={1}
        loadMore={fetchPosts}
        hasMore={hasMorePosts && !loadingPosts}
      >
        {posts.map((post) => (
          <JobCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      { loadingPosts ? renderLoader() : null }
    </>
  );
};

ContentList.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ContentList;
