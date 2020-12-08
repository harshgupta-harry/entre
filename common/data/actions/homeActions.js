import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api';

export const loadFeedComplete = createAction('LOAD_FEED_SUCCESS');
export const resetFeed = createAction('RESET_FEED');
export const loadFeed = createAction('LOAD_FEED', async (limit = 10, offset = 0, filter = null) => {
  let url = `post/search?limit=${limit}&offset=${offset}`;
  if (filter) {
    if (filter.feedFilter && filter.feedFilter === 'connections') {
      url = `post?limit=${limit}&offset=${offset}&connectedUsers=true`;
    } else if (filter.feedFilter) {
      url += `&sortBy=${filter.feedFilter}`;
    }
  }
  const resp = await api.get(url, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadFeedComplete(resp.data.data));
  } else {
    // dispatch(loadFeedFailed(resp.data.error));
  }
});

export const loadPostsComplete = createAction('LOAD_POSTS_SUCCESS');
export const resetPosts = createAction('RESET_POSTS');
export const loadPosts = createAction('LOAD_POSTS', async (limit = 10, offset = 0, filter = null) => {
  let url = `post/search?limit=${limit}&offset=${offset}`;
  if (filter) {
    if (filter.industry && filter.industry !== 'All') {
      url += `&industry=${filter.industry}`;
    }
    if (filter.location && filter.location !== 'All') {
      url += `&city=${filter.location.city}`;
    }
    if (filter.searchQuery && filter.searchQuery !== '') {
      url += `&searchText=${filter.searchQuery}`;
    }
    if (filter.contentFilter && filter.contentFilter !== '') {
      url += `&sortBy=${filter.contentFilter}`;
    }
  }
  const resp = await api.get(url, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadPostsComplete(resp.data.data));
  } else {
    // dispatch(loadPostsFailed(resp.data.error));
  }
});

export const loadCommentsComplete = createAction('LOAD_COMMENTS_SUCCESS');
export const loadComments = createAction('LOAD_COMMENTS', async (postId, offset = 0, limit = 10) => {
  const resp = await api.get(`post/${postId}/comment?limit=${limit}&offset=${offset}&sort=DESC`, {});
  if (resp && resp.data.data) {
    const comments = resp.data.data;
    // if (comments.length) {

    // }
    getStore().dispatch(loadCommentsComplete(comments));
  } else {
    // dispatch(loadPostsFailed(resp.data.error));
  }
});

export const setVoteComplete = createAction('SET_VOTE_SUCCESS');
export const setVote = createAction('SET_VOTE', async (postId, isFavorite) => {
  const resp = await api.post(`post/${postId}/favorite`, {
    isFavorite,
  });
  if (resp && resp.data.data) {
    getStore().dispatch(setVoteComplete());
  }
});

export const loadPostComplete = createAction('LOAD_POST_SUCCESS');
export const loadPost = createAction('LOAD_POST', async (postId) => {
  const { home } = getStore().getState();
  if (home.posts.length) {
    const localPost = home.posts.find((post) => post.id === postId);
    if (localPost) {
      getStore().dispatch(loadPostComplete(localPost));
      return;
    }
  }

  const resp = await api.get(`post/${postId}`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadPostComplete(resp.data.data));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const addCommentComplete = createAction('ADD_COMMENT_SUCCESS');
export const pushComment = createAction('PUSH_COMMENT');
export const addComment = createAction('ADD_COMMENT', async (postId, comment) => {
  const resp = await api.post(`post/${postId}/comment`, { ...comment });
  if (resp && resp.data.data) {
    getStore().dispatch(addCommentComplete(resp.data.data));
    // getStore().dispatch(loadComments(postId));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const blockUserComplete = createAction('BLOCK_USER_SUCCESS');
export const blockUser = createAction('BLOCK_USER', async (userId) => {
  window.analytics.track('User Block', { id: userId });
  const resp = await api.post('user/block', {
    blockUserId: userId,
  });
  if (resp && resp.data.data) {
    getStore().dispatch(blockUserComplete(userId));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const deleteCommentComplete = createAction('DELETE_COMMENT_SUCCESS');

export const deleteComment = createAction('DELETE', async (postId, commentId) => {
  const resp = await api.delete(`post/${postId}/comment/${commentId}`);
  if (resp) {
    getStore().dispatch(deleteCommentComplete(commentId));
    // getStore().dispatch(loadComments(postId));
  }
});

export const deletePostComplete = createAction('DELETE_POST_SUCCESS');
export const deletePost = createAction('DELETE_POST', async (postId) => {
  const resp = await api.delete(`post/${postId}`);
  if (resp) {
    getStore().dispatch(deletePostComplete(postId));
  }
});
