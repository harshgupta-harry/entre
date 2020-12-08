import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostCard from './PostCard';
import {
  loadCompanyPosts,
  resetCompanyPosts,
} from '../../../common/data/actions';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.companies.posts);
  const loadingPosts = useSelector((state) => state.companies.loadingPosts);
  const hasMorePosts = useSelector((state) => state.companies.hasMorePosts);
  const search = useSelector((state) => state.search);
  const pageSize = 10;

  useEffect(() => {
    dispatch(resetCompanyPosts());
    dispatch(loadCompanyPosts(pageSize, 0, search));
  }, [search]);

  const fetchPosts = useCallback((p) => {
    dispatch(loadCompanyPosts(pageSize, (p - 1) * pageSize, search));
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
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      { loadingPosts ? renderLoader() : null }
    </>
  );
};

export default PostList;
