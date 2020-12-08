import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api';
import newApi from '../../api/newApi';

export const loadEventPostsComplete = createAction('LOAD_EVENT_POSTS_SUCCESS');
export const resetEventPosts = createAction('RESET_EVENT_POSTS');
export const loadEventPosts = createAction('LOAD_EVENT_POSTS', async (limit = 10, offset = 0, filter = null) => {
  const { auth } = getStore().getState();
  let url = `event/search?limit=${limit}&offset=${offset}`;
  if (!auth.token) {
    url = `public/${url}`;
  }
  if (filter.industry && filter.industry !== 'All') {
    url += `&industry=${filter.industry}`;
  }
  if (filter.eventType && filter.eventType !== 'All') {
    url += `&eventType=${filter.eventType}`;
  }
  if (filter.location && filter.location.city) {
    url += `&city=${filter.location.city}`;
  }
  if (filter.searchQuery && filter.searchQuery !== '') {
    url += `&searchText=${filter.searchQuery}`;
  }
  const resp = await api.get(url, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadEventPostsComplete(resp.data.data));
  } else {
    // dispatch(loadPostsFailed(resp.data.error));
  }
});

export const loadEventCommentsComplete = createAction('LOAD_EVENT_COMMENTS_SUCCESS');
export const loadEventComments = createAction('LOAD_EVENT_COMMENTS', async (eventId) => {
  const resp = await api.get(`event/${eventId}/comment`, {});
  if (resp && resp.data.data) {
    const comments = resp.data.data;
    getStore().dispatch(loadEventCommentsComplete(comments));
  } else {
    // dispatch(loadPostsFailed(resp.data.error));
  }
});

export const loadEventAttendeesComplete = createAction('LOAD_EVENT_ATTENDEES_SUCCESS');
export const loadEventAttendees = createAction('LOAD_EVENT_ATTENDEES', async (eventId) => {
  const resp = await api.get(`event/${eventId}/attendees`, {});
  if (resp && resp.data.data) {
    const attendees = resp.data.data;
    getStore().dispatch(loadEventAttendeesComplete(attendees));
  } else {
    // dispatch(loadPostsFailed(resp.data.error));
  }
});

export const setEventVoteComplete = createAction('SET_EVENT_VOTE_SUCCESS');
export const setEventVote = createAction('SET_EVENT_VOTE', async (eventId, isFavorite) => {
  const resp = await api.post(`event/${eventId}/favorite`, {
    isFavorite,
  });
  if (resp && resp.data.data) {
    getStore().dispatch(setEventVoteComplete());
  }
});

export const setSignUpAnEventComplete = createAction('SET_EVENT_SIGN_UP_SUCCESS');
export const setSignUpAnEvent = createAction('SET_EVENT_SIGN_UP', async (eventId) => {
  const resp = await api.post(`event/${eventId}/attend`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(setSignUpAnEventComplete());
    getStore().dispatch(loadEventAttendees(eventId));
  }
});

export const setSignOutAnEventComplete = createAction('SET_EVENT_SIGN_OUT_SUCCESS');
export const setSignOutAnEvent = createAction('SET_EVENT_SIGN_OUT', async (eventId) => {
  const resp = await api.delete(`event/${eventId}/attend`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(setSignOutAnEventComplete());
    getStore().dispatch(loadEventAttendees(eventId));
  }
});

export const clearEventPost = createAction('CLEAR_EVENT_POST');
export const loadEventPostComplete = createAction('LOAD_EVENT_POST_SUCCESS');
export const loadEventPost = createAction('LOAD_EVENT_POST', async (eventId) => {
  const { home } = getStore().getState();
  const { auth } = getStore().getState();
  if (home.posts.length) {
    const localPost = home.posts.find((post) => post.id === eventId);
    if (localPost) {
      getStore().dispatch(loadEventPostComplete(localPost));
      return;
    }
  }

  let url = `event/${eventId}`;
  if (!auth.token) {
    url = `public/${url}`;
  }
  const resp = await newApi.get(url, {});
  if (resp && resp.data) {
    getStore().dispatch(loadEventPostComplete(resp.data));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const addEventCommentComplete = createAction('ADD_EVENT_COMMENT_SUCCESS');
export const pushEventComment = createAction('PUSH_EVENT_COMMENT');
export const addEventComment = createAction('ADD_EVENT_COMMENT', async (eventId, comment) => {
  const resp = await api.post(`event/${eventId}/comment`, { ...comment });
  if (resp && resp.data.data) {
    getStore().dispatch(addEventCommentComplete(resp.data.data));
    getStore().dispatch(loadEventComments(eventId));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const blockEventUserComplete = createAction('BLOCK_EVENT_USER_SUCCESS');
export const blockEventUser = createAction('BLOCK_EVENT_USER', async (userId) => {
  const resp = await api.post('user/block', {
    blockUserId: userId,
  });
  if (resp && resp.data.data) {
    getStore().dispatch(blockEventUserComplete(userId));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const deleteEventPostComplete = createAction('DELETE_EVENT_POST_SUCCESS');

export const deleteEventPost = createAction('DELETE_EVENT', async (eventId) => {
  const resp = await api.delete(`event/${eventId}`);
  if (resp) {
    getStore().dispatch(deleteEventPostComplete(eventId));
  }
});


export const updateUserConnectionStatusComplete = createAction('SET_USER_CONNECTION_SUCCESS');
export const updateUserConnectionStatus = createAction('SET_USER_CONNECTION', async (userId, mode, eventId) => {
  let url = '';
  let sucessStatus = '';
  // eslint-disable-next-line no-unused-vars
  let failStatus = '';
  let postBody = {};

  // eslint-disable-next-line default-case
  switch (mode) {
    case 'Connected':
      url = 'user/follower/unfollow';
      sucessStatus = 'Connect';
      failStatus = 'Connected';
      postBody = {
        connectedUserId: userId,
      };
      break;
    case 'Connect':
      url = 'user/follower/request';
      sucessStatus = 'Requested';
      failStatus = 'Connect';
      postBody = {
        connectedUserId: userId,
      };
      break;
    case 'Accept':
      url = 'user/follower/accept';
      sucessStatus = 'connection_accepted';
      failStatus = 'Accept';
      postBody = {
        id: userId,
      };
      break;
    case 'Decline':
      url = 'user/follower/reject';
      sucessStatus = 'connection_rejected';
      failStatus = 'Decline';
      postBody = {
        id: userId,
      };
      break;
  }

  const resp = await api.post(url, postBody);
  if (resp && resp.status === 200) {
    // eslint-disable-next-line max-len
    const payload = { userId, connectionStatus: sucessStatus, eventId };
    getStore().dispatch(updateUserConnectionStatusComplete(payload));
    getStore().dispatch(loadEventAttendees(eventId));
  } else {
    // failStatus
  }
});

export const loadCompanyEventsComplete = createAction('LOAD_COMPANY_EVENTS_SUCCESS');
export const loadCompanyEvents = createAction('LOAD_COMPANY_EVENTS', async (userId) => {
  const resp = await api.get(`event/user/${userId}`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadCompanyEventsComplete(resp.data.data));
  } else {
    getStore().dispatch(loadCompanyEventsComplete([]));
    // dispatch(loadPostFailed(resp.data.error));
  }
});
