import { handleActions } from 'redux-actions';
import {
  loadDeals,
  loadDealsComplete,
} from '../actions/dealsActions';

const INITIAL_STATE = {
  loadingDeals: false,
  list: [],
};

const reducer = handleActions(
  {
    [loadDeals]: (state) => ({ ...state, loadingDeals: true }),
    [loadDealsComplete]: (state, { payload }) => ({
      ...state,
      list: payload,
      loadingDeals: false,
    }),
  },
  INITIAL_STATE,
);

export default reducer;
