import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api';

export const createPostComplete = createAction('CREATE_POST_SUCCESS');
export const createPost = createAction('CREATE_POST', async (newPost) => {
  const resp = await api.post('post', { ...newPost });
  if (resp && resp.data.data) {
    getStore().dispatch(createPostComplete());
  }
});
