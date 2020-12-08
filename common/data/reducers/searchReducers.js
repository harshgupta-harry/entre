import { handleActions } from 'redux-actions';
import {
  setFilters,
} from '../actions/searchActions';

const INITIAL_STATE = {
  section: 'posts',
  industry: '',
  eventType: '',
  title: '',
  contract: '',
  exprience: '',
  searchQuery: '',
  peopleFilter: 'popular',
  contentFilter: 'newest',
};

const reducer = handleActions(
  {
    [setFilters]: (state, { payload }) => ({ ...state, ...payload }),
  },
  INITIAL_STATE,
);

export default reducer;
