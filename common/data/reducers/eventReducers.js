import { handleActions } from 'redux-actions';
import {
  loadEventPosts,
  resetEventPosts,
  loadEventPostsComplete,
  loadEventComments,
  loadEventCommentsComplete,
  loadEventAttendees,
  loadEventAttendeesComplete,
  clearEventPost,
  loadEventPost,
  loadEventPostComplete,
  pushEventComment,
  blockEventUserComplete,
  deleteEventPostComplete,
  loadCompanyEvents,
  loadCompanyEventsComplete,
} from '../actions/eventActions';
import { updateUserConnectionStatusComplete, updateUserConnectionStatus } from '../actions';

const INITIAL_STATE = {
  loadingPost: false,
  loadingPosts: false,
  hasMorePosts: false,
  loadingComments: false,
  loadingAttendees: false,
  post: null,
  posts: [],
  comments: [],
  attendees: [],
};

const reducer = handleActions(
  {
    [loadEventPosts]: (state) => ({ ...state, loadingPosts: true }),
    [resetEventPosts]: (state) => ({ ...state, posts: INITIAL_STATE.posts }),
    [loadEventPostsComplete]: (state, { payload }) => {
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
    [clearEventPost]: (state) => ({ ...state, post: null }),
    [loadEventPost]: (state) => ({ ...state, loadingPost: true }),
    [loadEventPostComplete]: (state, { payload }) => ({
      ...state,
      post: payload,
      loadingPost: false,
    }),
    [pushEventComment]: (state, { payload }) => ({
      ...state,
      comments: [...state.comments, payload],
    }),
    [loadEventComments]: (state) => ({ ...state, loadingComments: true }),
    [loadEventCommentsComplete]: (state, { payload }) => ({
      ...state,
      comments: payload,
      loadingComments: false,
      post: { ...state.post, commentCount: payload.length },
    }),
    [loadEventAttendees]: (state) => ({ ...state, loadingAttendees: true }),
    [loadEventAttendeesComplete]: (state, { payload }) => ({
      ...state,
      attendees: payload,
      loadingAttendees: false,
    }),
    [blockEventUserComplete]: (state, { payload }) => ({
      ...state,
      posts: state.posts.filter((post) => post.author.id !== payload),
      comments: state.comments.filter((comment) => comment.author.id !== payload),
    }),
    [deleteEventPostComplete]: (state, { payload }) => ({
      ...state,
      posts: state.posts.filter((post) => post.id !== payload),
    }),
    [updateUserConnectionStatus]: (state) => ({ ...state, loadingAttendees: true }),
    [updateUserConnectionStatusComplete]: (state, { payload }) => {
      const updatedAttendees = [...state.attendees];
      const updatedUser = updatedAttendees.find((element) => element.id === payload.userId);
      if (updatedUser) {
        updatedUser.connectionStatus = payload.connectionStatus;
      }
      // console.log('updatedUser', updatedUser);
      return {
        ...state,
        attendees: updatedAttendees,
        loadingAttendees: false,
      };
    },
    [loadCompanyEvents]: (state) => ({ ...state, posts: [], loadingPosts: true }),
    [loadCompanyEventsComplete]: (state, { payload }) => ({
      ...state,
      posts: payload,
      loadingPosts: false,
    }),
  },
  INITIAL_STATE,
);

export default reducer;
