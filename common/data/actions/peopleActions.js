import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api';

export const loadPeopleComplete = createAction('LOAD_PEOPLE_SUCCESS');
export const resetPeople = createAction('RESET_PEOPLE');
export const loadPeople = createAction('LOAD_PEOPLE', async (limit = 10, offset = 0, filter = null) => {
  let url = `user/search?limit=${limit}&offset=${offset}`;
  if (filter) {
    if (filter.industry && filter.industry !== 'All') {
      url += `&industry=${filter.industry}`;
    }
    if (filter.title && filter.title !== 'All') {
      url += `&title=${filter.title}`;
    }
    if (filter.location && filter.location !== 'All') {
      url += `&city=${filter.location.city}`;
    }
    if (filter.searchQuery && filter.searchQuery !== '') {
      url += `&searchText=${filter.searchQuery}`;
    }
    if (filter.peopleFilter && filter.peopleFilter !== '') {
      url += `&sortBy=${filter.peopleFilter}`;
    }
  }
  const resp = await api.get(url, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadPeopleComplete(resp.data.data));
  } else {
    // dispatch(loadPeopleFailed(resp.data.error));
  }
});

export const updateUserConnectionComplete = createAction('UPDATE_CONNECTION_SUCCESS');
export const updateUserConnection = createAction('UPDATE_CONNECTION', async (userId, mode) => {
  let url = '';
  let sucessStatus = '';
  let failStatus = '';
  let postBody = {};

  switch (mode) {
    case 'Connected':
      url = 'user/follower/unfollow';
      sucessStatus = 'Connect';
      failStatus = 'Connected';
      postBody = {
        connectedUserId: userId,
      };
      window.analytics.track('Connection Unfollow', { id: userId });
      break;
    case 'Connect':
      url = 'user/follower/request';
      sucessStatus = 'Requested';
      failStatus = 'Connect';
      postBody = {
        connectedUserId: userId,
      };
      window.analytics.track('Connection Request', { id: userId });
      break;
    case 'Accept':
      url = 'user/follower/accept';
      sucessStatus = 'connection_accepted';
      failStatus = 'Accept';
      postBody = {
        id: userId,
      };
      window.analytics.track('Connection Accept', { id: userId });
      break;
    case 'Decline':
      url = 'user/follower/reject';
      sucessStatus = 'connection_rejected';
      failStatus = 'Decline';
      postBody = {
        id: userId,
      };
      window.analytics.track('Connection Reject', { id: userId });
      break;
    default:
      break;
  }

  if (url !== '') {
    const resp = await api.post(url, postBody);
    return { message: resp.data.data, sucessStatus, failStatus };
  }
  return { message: 'Request already sent' };
});

export const loadBlockedUsersComplete = createAction('LOAD_BLOCKED_USERS_SUCCESS');
export const loadBlockedUsers = createAction('LOAD_BLOCKED_USERS', async () => {
  const url = 'user/blocked';
  const resp = await api.get(url);
  if (resp && resp.data.data) {
    getStore().dispatch(loadBlockedUsersComplete(resp.data.data));
  } else {
    // dispatch(loadBlockedUsersFailed(resp.data.error));
  }
});

export const unblockUserComplete = createAction('UNBLOCK_USER_SUCCESS');
export const unblockUser = createAction('UNBLOCK_USER', async (unBlockUserId) => {
  const postBody = {
    unBlockUserId,
  };
  window.analytics.track('User Unblock', { id: unBlockUserId });
  const resp = await api.post('/user/unblock', postBody);
  if (resp && resp.data.data) {
    getStore().dispatch(unblockUserComplete(unBlockUserId));
    return { message: resp.data.data };
  }
  // dispatch(loadPeopleFailed(resp.data.error));
  return { message: resp.data.data };
});

export const upgradeUserToProComplete = createAction('UPGRADE_USER_SUCCESS');
export const upgradeUserToPro = createAction('UPGRADE_USER', async (userIds, isPro = true) => {
  const postBody = {
    userIds,
    isPro,
  };
  const resp = await api.post('user/upgradetopro', postBody);
  if (resp && resp.data.data) {
    getStore().dispatch(upgradeUserToProComplete({ userIds, isPro }));
    return { message: resp.data.data };
  }
  // dispatch(loadPeopleFailed(resp.data.error));
  return { message: resp.data.data };
});


export const deleteUserComplete = createAction('DELETE_USER_SUCCESS');
export const deleteUser = createAction('DELETE_USER', async (userId) => {
  const resp = await api.delete(`user/${userId}`);
  if (resp && resp.data.data) {
    getStore().dispatch(deleteUserComplete(userId));
    return { message: resp.data.data };
  }
  // dispatch(loadPeopleFailed(resp.data.error));
  return { message: resp.data.data };
});
