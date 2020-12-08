import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api';

export const loadJobPostsComplete = createAction('LOAD_JOB_POSTS_SUCCESS');
export const resetJobPosts = createAction('RESET_JOB_POSTS');
export const loadJobPosts = createAction('LOAD_JOB_POSTS', async (limit = 10, offset = 0, filter = null) => {
  let url = `job/search?limit=${limit}&offset=${offset}`;
  if (filter.industry && filter.industry !== 'All') {
    url += `&industry=${filter.industry}`;
  }
  if (filter.contract && filter.contract !== 'All') {
    url += `&contract=${filter.contract}`;
  }
  if (filter.exprience && filter.exprience !== 'All') {
    url += `&exprience=${filter.exprience}`;
  }
  if (filter.location && filter.location.city) {
    url += `&city=${filter.location.city}`;
  }
  if (filter.searchQuery && filter.searchQuery !== '') {
    url += `&searchText=${filter.searchQuery}`;
  }
  const resp = await api.get(url, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadJobPostsComplete(resp.data.data));
  } else {
    // dispatch(loadPostsFailed(resp.data.error));
  }
});

export const loadJobPostComplete = createAction('LOAD_JOB_POST_SUCCESS');
export const loadJobPost = createAction('LOAD_JOB_POST', async (jobId) => {
  const { home } = getStore().getState();
  if (home.posts.length) {
    const localPost = home.posts.find((post) => post.id === jobId);
    if (localPost) {
      getStore().dispatch(loadJobPostComplete(localPost));
      return;
    }
  }

  const resp = await api.get(`job/${jobId}`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadJobPostComplete(resp.data.data));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const setSignUpAnJobComplete = createAction('SET_JOB_SIGN_UP_SUCCESS');
export const setSignUpAnJob = createAction('SET_JOB_SIGN_UP', async (jobId) => {
  const resp = await api.post(`job/${jobId}/apply`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(setSignUpAnJobComplete());
    getStore().dispatch(loadJobPost(jobId));
    return { message: 'Job applied successfully' };
  }
  return { message: 'Job already applied' };
});

export const deleteJobPostComplete = createAction('DELETE_JOB_POST_SUCCESS');

export const deleteJobPost = createAction('DELETE_JOB', async (jobId) => {
  const resp = await api.delete(`job/${jobId}`);
  if (resp) {
    getStore().dispatch(deleteJobPostComplete(jobId));
  }
});
