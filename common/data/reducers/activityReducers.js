import { handleActions } from 'redux-actions';
import {
  loadNotifications,
  resetNotifications,
  loadNotificationsComplete,
} from '../actions/activityActions';

const INITIAL_STATE = {
  loadingPosts: false,
  hasMorePosts: false,
  posts: [],
};

const reducer = handleActions(
  {
    [loadNotifications]: (state) => ({ ...state, loadingPosts: true }),
    [resetNotifications]: (state) => ({ ...state, posts: [] }),
    [loadNotificationsComplete]: (state, { payload }) => {
      let { posts } = payload;
      const { total } = payload;
      if (posts.length && state.posts.length > 0) {
        posts = [...state.posts, ...posts];
      } else if (posts.length === 0 && state.posts.length > 0) {
        posts = state.posts;
      }

      return {
        ...state,
        posts,
        hasMorePosts: total === 10,
        loadingPosts: false,
      };
    },
  },
  INITIAL_STATE,
);

export default reducer;
