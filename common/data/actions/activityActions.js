import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api';

export const loadNotificationsComplete = createAction('LOAD_NOTIFICATIONS_SUCCESS');
export const resetNotifications = createAction('RESET_NOTIFICATIONS');
export const loadNotifications = createAction('LOAD_NOTIFICATIONS', async (limit = 10, offset = 0, type = null) => {
  let url = `user/activity?limit=${limit}&offset=${offset}`;
  if (type !== null) {
    url = `${url}&activityType=${type}`;
  }
  const resp = await api.get(url, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadNotificationsComplete({
      posts: resp.data.data, total: resp.data.total,
    }));
  } else {
    // dispatch(loadPeopleFailed(resp.data.error));
  }
});

export const approveConnectionComplete = createAction('APPROVE_CONNECTION_SUCCESS');
export const approveConnection = createAction('APPROVE_CONNECTION', async (userId) => {
  const url = 'user/follower/accept';
  const sucessStatus = 'connection_approved';
  const failStatus = 'Accept';
  const postBody = { id: userId };


  if (url !== '') {
    const resp = await api.post(url, postBody);
    return { message: resp.data.data, sucessStatus, failStatus };
  }
  return { message: 'Cannot approve the request' };
});

export const rejectConnectionComplete = createAction('REJECT_CONNECTION_SUCCESS');

export const rejectConnection = createAction('REJECT_CONNECTION', async (userId) => {
  const url = 'user/follower/reject';
  const sucessStatus = 'connection_rejected';
  const failStatus = 'connection_pending';
  const postBody = {
    id: userId,
  };

  if (url !== '') {
    const resp = await api.post(url, postBody);
    return { message: resp.data.data, sucessStatus, failStatus };
  }
  return { message: 'Fail to decline the connection' };
});
