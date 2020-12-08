import { createAction } from 'redux-actions';
import { getStore } from '../../../store';
import api from '../../api/newApi';

export const loadTicketsComplete = createAction('LOAD_TICKETS_SUCCESS');
export const loadTickets = createAction('LOAD_TICKETS', async () => {
  const resp = await api.get('tickets', {});
  if (resp && resp.data) {
    getStore().dispatch(loadTicketsComplete(resp.data));
  } else {
    // dispatch(loadTicketsFailed(resp.data.error));
  }
});
