import { handleActions } from 'redux-actions';
import {
  loadTickets,
  loadTicketsComplete,
} from '../actions/ticketActions';

const INITIAL_STATE = {
  loading: false,
  list: [],
};

const reducer = handleActions(
  {
    [loadTickets]: (state) => ({ ...state, loading: true }),
    [loadTicketsComplete]: (state, { payload }) => ({
      ...state,
      list: payload,
      loading: false,
    }),
  },
  INITIAL_STATE,
);

export default reducer;
