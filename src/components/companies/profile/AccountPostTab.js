import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostCard from '../../content/PostCard';
import {
  loadAccountPosts,
} from '../../../../common/data/actions';

const AccountPostTab = (props) => {
  const dispatch = useDispatch();
  const { loadUsername } = props;
  const postLoading = useSelector((state) => state.account.postLoading);
  const posts = useSelector((state) => state.account.posts);

  useEffect(() => {
    if (loadUsername) {
      dispatch(loadAccountPosts(loadUsername));
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

  if (posts.length === 0 && postLoading) return renderLoader();
  if (posts.length === 0 && !postLoading) return <div>No posts</div>;

  return (
    <>
      {!postLoading && posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

AccountPostTab.propTypes = {
  loadUsername: PropTypes.string.isRequired,
};

export default AccountPostTab;
