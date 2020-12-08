import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import ActivitiyCard from '../components/content/ActivitiyCard';
import {
  loadNotifications,
  resetNotifications,
} from '../../common/data/actions';

const PostList = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.activity.posts);
  const loadingPosts = useSelector((state) => state.activity.loadingPosts);
  const hasMorePosts = useSelector((state) => state.activity.hasMorePosts);
  const { type } = props;
  const pageSize = 10;

  useEffect(() => {
    dispatch(resetNotifications());
    dispatch(loadNotifications(pageSize, 0, type));
  }, [type]);

  const fetchPosts = useCallback((p) => {
    dispatch(loadNotifications(pageSize, (p - 1) * pageSize, type));
  }, [type]);

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
        pageStart={1}
        style={{ width: '100%' }}
        loadMore={fetchPosts}
        hasMore={hasMorePosts && !loadingPosts}
      >
        {posts.map((post) => (
          <ActivitiyCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      { loadingPosts ? renderLoader() : null }
    </>
  );
};

PostList.propTypes = {
  type: PropTypes.string,
};

PostList.defaultProps = {
  type: null,
};

export default PostList;
