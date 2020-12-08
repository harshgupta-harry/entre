import { handleActions } from 'redux-actions';
import {
  loadBlockedUsers,
  loadBlockedUsersComplete,
  unblockUserComplete,
  loadPeople,
  resetPeople,
  loadPeopleComplete,
  upgradeUserToProComplete,
  deleteUserComplete,
} from '../actions/peopleActions';

const INITIAL_STATE = {
  loadingPeople: false,
  loadingBlockedUsers: false,
  hasMorePeople: false,
  people: [],
  blocked: [],
};

const reducer = handleActions(
  {
    [loadPeople]: (state) => ({ ...state, loadingPeople: true }),
    [resetPeople]: (state) => ({ ...state, people: INITIAL_STATE.people }),
    [loadPeopleComplete]: (state, { payload }) => {
      let people = payload;
      if (payload.length && state.people.length > 0) {
        people = [...state.people, ...payload];
      } else if (payload.length === 0 && state.people.length > 0) {
        people = state.people;
      }

      return {
        ...state,
        people,
        hasMorePeople: payload.length === 10,
        loadingPeople: false,
      };
    },
    [loadBlockedUsers]: (state) => ({ ...state, loadingBlockedUsers: true }),
    [loadBlockedUsersComplete]: (state, { payload }) => ({
      ...state,
      blocked: payload,
      loadingBlockedUsers: false,
    }),
    [unblockUserComplete]: (state, { payload }) => ({
      ...state,
      blocked: state.blocked.filter((b) => b.id !== payload),
      loadingBlockedUsers: false,
    }),
    [upgradeUserToProComplete]: (state, { payload }) => ({
      ...state,
      people: state.people.map((p) => {
        const ids = new Set(payload.userIds);
        if (ids.has(p.id)) {
          return {
            ...p,
            isPro: payload.isPro,
          };
        }
        return p;
      }),
    }),
    [deleteUserComplete]: (state, { payload }) => ({
      ...state,
      people: state.people.filter((people) => people.id !== payload),
    }),
  },
  INITIAL_STATE,
);

export default reducer;
