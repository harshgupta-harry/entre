import { handleActions } from 'redux-actions';
import {
  loadJobPosts,
  resetJobPosts,
  loadJobPostsComplete,
  loadJobPost,
  loadJobPostComplete,
  deleteJobPostComplete,
} from '../actions/jobActions';
import { loadCompanyJobs, loadCompanyJobsComplete } from '../actions';

const INITIAL_STATE = {
  loadingPost: false,
  loadingPosts: false,
  hasMorePosts: false,
  post: null,
  posts: [],
};

const reducer = handleActions(
  {
    [loadJobPosts]: (state) => ({ ...state, loadingPosts: true }),
    [resetJobPosts]: (state) => ({ ...state, posts: INITIAL_STATE.posts }),
    [loadJobPostsComplete]: (state, { payload }) => {
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
    [loadJobPost]: (state) => ({ ...state, loadingPost: true }),
    [loadJobPostComplete]: (state, { payload }) => ({
      ...state,
      post: payload,
      loadingPost: false,
    }),
    [loadCompanyJobs]: (state) => ({ ...state, loadingPosts: true }),
    [loadCompanyJobsComplete]: (state, { payload }) => ({
      ...state,
      posts: payload,
      loadingPosts: false,
    }),
    [deleteJobPostComplete]: (state, { payload }) => ({
      ...state,
      posts: state.posts.filter((post) => post.id !== payload),
    }),
  },
  INITIAL_STATE,
);

export default reducer;
