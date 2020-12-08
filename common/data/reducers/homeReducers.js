import { handleActions } from 'redux-actions';
import {
  loadFeed,
  resetFeed,
  loadFeedComplete,
  loadPosts,
  resetPosts,
  loadPostsComplete,
  loadComments,
  loadCommentsComplete,
  loadPost,
  loadPostComplete,
  pushComment,
  blockUserComplete,
  deleteCommentComplete,
  deletePostComplete,
} from '../actions/homeActions';

const INITIAL_STATE = {
  loadingPost: false,
  loadingFeed: false,
  loadingPosts: false,
  hasMorePosts: false,
  hasMoreFeed: false,
  loadingComments: false,
  hasMoreComments: false,
  post: null,
  posts: [],
  comments: [],
  feed: [],
};

const reducer = handleActions(
  {
    [loadFeed]: (state) => ({ ...state, loadingFeed: true }),
    [resetFeed]: (state) => ({ ...state, feed: INITIAL_STATE.feed }),
    [loadFeedComplete]: (state, { payload }) => {
      let feed = payload;
      if (payload.length && state.feed.length > 0) {
        feed = [...state.feed, ...payload];
      } else if (payload.length === 0 && state.feed.length > 0) {
        feed = state.feed;
      }

      return {
        ...state,
        feed,
        hasMoreFeed: payload.length === 10,
        loadingFeed: false,
      };
    },
    [loadPosts]: (state) => ({ ...state, loadingPosts: true }),
    [resetPosts]: (state) => ({ ...state, posts: INITIAL_STATE.posts }),
    [loadPostsComplete]: (state, { payload }) => {
      let posts = payload;
      if (payload.length && state.posts.length > 0) {
        posts = [...state.posts, ...payload];
      } else if (payload.length === 0 && state.posts.length > 0) {
        posts = state.posts;
      }

      return {
        ...state,
        posts,
        hasMorePosts: payload.length === 10,
        loadingPosts: false,
      };
    },
    [loadPost]: (state) => ({ ...state, loadingPost: true }),
    [loadPostComplete]: (state, { payload }) => ({
      ...state,
      post: payload,
      loadingPost: false,
    }),
    [pushComment]: (state, { payload }) => ({
      ...state,
      comments: [payload, ...state.comments],
    }),
    [loadComments]: (state) => ({ ...state, loadingComments: true }),
    [loadCommentsComplete]: (state, { payload }) => {
      let comments = payload;
      if (payload.length && state.comments.length > 0) {
        comments = [...state.comments, ...payload];
      } else if (payload.length === 0 && state.comments.length > 0) {
        comments = state.comments;
      }

      return {
        ...state,
        comments,
        hasMoreComments: payload.length === 10,
        loadingComments: false,
        post: { ...state.post, commentCount: payload.length },
      };
    },
    [blockUserComplete]: (state, { payload }) => ({
      ...state,
      posts: state.posts.filter((post) => post.author.id !== payload),
      feed: state.feed.filter((post) => post.author.id !== payload),
      comments: state.comments.filter((comment) => comment.author.id !== payload),
    }),
    [deleteCommentComplete]: (state, { payload }) => ({
      ...state,
      comments: state.comments.filter((comment) => comment.id !== payload),
    }),
    [deletePostComplete]: (state, { payload }) => ({
      ...state,
      posts: state.posts.filter((post) => post.id !== payload),
      feed: state.feed.filter((post) => post.id !== payload),
    }),
  },
  INITIAL_STATE,
);

export default reducer;
