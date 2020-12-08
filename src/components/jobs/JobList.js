import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from './JobCard';
import {
  loadJobPosts,
  resetJobPosts,
} from '../../../common/data/actions';

const JobList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.jobs.posts);
  const loadingPosts = useSelector((state) => state.jobs.loadingPosts);
  const hasMorePosts = useSelector((state) => state.jobs.hasMorePosts);
  const search = useSelector((state) => state.search);
  const pageSize = 10;

  useEffect(() => {
    dispatch(resetJobPosts());
    dispatch(loadJobPosts(pageSize, 0, search));
  }, [search]);

  const fetchPosts = useCallback((p) => {
    dispatch(loadJobPosts(pageSize, (p - 1) * pageSize, search));
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
          <JobCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      { loadingPosts ? renderLoader() : null }
    </>
  );
};

export default JobList;
