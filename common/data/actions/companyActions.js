import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api';

export const loadCompanyPostsComplete = createAction('LOAD_COMPANY_POSTS_SUCCESS');
export const resetCompanyPosts = createAction('RESET_COMPANY_POSTS');
export const loadCompanyPosts = createAction('LOAD_COMPANY_POSTS', async (limit = 10, offset = 0, filter = null) => {
  let url = `company/search?limit=${limit}&offset=${offset}`;
  if (filter.industry && filter.industry !== 'All') {
    url += `&industry=${filter.industry}`;
  }
  if (filter.location && filter.location.city) {
    url += `&city=${filter.location.city}`;
  }
  if (filter.searchQuery && filter.searchQuery !== '') {
    url += `&searchText=${filter.searchQuery}`;
  }
  const resp = await api.get(url, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadCompanyPostsComplete(resp.data.data));
  } else {
    // dispatch(loadPostsFailed(resp.data.error));
  }
});

export const loadCompanyPostComplete = createAction('LOAD_COMPANY_POST_SUCCESS');
export const loadCompanyPost = createAction('LOAD_COMPANY_POST', async (companyId) => {
  const resp = await api.get(`company/${companyId}`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadCompanyPostComplete(resp.data.data));
  } else {
    // dispatch(loadPostFailed(resp.data.error));
  }
});

export const setCompanyVoteComplete = createAction('SET_COMPANY_VOTE_SUCCESS');
export const setCompanyVote = createAction('SET_COMPANY_VOTE', async (companyId, isLike) => {
  const resp = await api.post(`company/${companyId}/like`, {
    isLike,
  });
  if (resp && resp.data.data) {
    getStore().dispatch(setCompanyVoteComplete());
  }
});

export const loadCompanyJobsComplete = createAction('LOAD_COMPANY_JOBS_SUCCESS');
export const loadCompanyJobs = createAction('LOAD_COMPANY_JOBS', async (companyId) => {
  const resp = await api.get(`company/${companyId}/job`, {});
  if (resp && resp.data.data) {
    getStore().dispatch(loadCompanyJobsComplete(resp.data.data));
  } else {
    getStore().dispatch(loadCompanyJobsComplete([]));
    // dispatch(loadPostFailed(resp.data.error));
  }
});
