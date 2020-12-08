import { handleActions } from 'redux-actions';
import {
  loadCompanyPosts,
  resetCompanyPosts,
  loadCompanyPostsComplete,
  loadCompanyPost,
  loadCompanyPostComplete,
} from '../actions';

const INITIAL_STATE = {
  loadingPost: false,
  loadingPosts: false,
  hasMorePosts: false,
  post: null,
  posts: [],
};

const reducer = handleActions(
  {
    [loadCompanyPosts]: (state) => ({ ...state, loadingPosts: true }),
    [resetCompanyPosts]: (state) => ({ ...state, posts: INITIAL_STATE.posts }),
    [loadCompanyPostsComplete]: (state, { payload }) => {
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
    [loadCompanyPost]: (state) => ({ ...state, loadingPost: true }),
    [loadCompanyPostComplete]: (state, { payload }) => ({
      ...state,
      post: payload,
      loadingPost: false,
    }),
  },
  INITIAL_STATE,
);

export default reducer;
