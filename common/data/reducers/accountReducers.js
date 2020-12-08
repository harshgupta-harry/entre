import { ACCOUNT, AUTH } from '../actions/types';

const INITIAL_STATE = {
  user: null,
  loaded: false,
  updating: false,
  industries: [],
  titles: [],
  connections: [],
  posts: [],
  industriesLoading: false,
  titlesLoading: false,
  postLoading: false,
  connectionsLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNT.INIT_ACCOUNT:
      return INITIAL_STATE;

    case ACCOUNT.LOAD_ACCOUNT_SUCCESS:
      return {
        ...state,
        loaded: true,
        user: action.payload,
      };
    case ACCOUNT.LOAD_CONNECTIONS:
      return {
        ...state,
        connectionsLoading: true,
      };
    case ACCOUNT.LOAD_CONNECTIONS_SUCCESS:
      return {
        ...state,
        connections: action.payload,
        connectionsLoading: false,
      };
    case ACCOUNT.LOAD_INDUSTRIES:
      return {
        ...state,
        industriesLoading: true,
      };
    case ACCOUNT.LOAD_TITLES:
      return {
        ...state,
        titlesLoading: true,
      };
    case ACCOUNT.LOAD_INDUSTRIES_SUCCESS:
      return {
        ...state,
        industries: action.payload,
        industriesLoading: false,
      };
    case ACCOUNT.LOAD_TITLES_SUCCESS:
      return {
        ...state,
        titles: action.payload,
        titlesLoading: false,
      };
    case ACCOUNT.LOAD_ACCOUNT_FAIL:
      return {
        ...state,
        loaded: true,
        errors: [
          { title: 'Error', description: 'There was an issue on the server' },
        ],
      };
    case AUTH.LOGOUT:
      return { ...INITIAL_STATE, loaded: true };
    case ACCOUNT.UPDATE_ACCOUNT:
      return {
        ...state,
        updating: true,
      };
    case ACCOUNT.UPDATE_ACCOUNT_FAIL:
    case ACCOUNT.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        updating: false,
      };
    case 'UNBLOCK_USER_SUCCESS': {
      const { user } = state;
      user.blockedUsers = user.blockedUsers.filter((bU) => bU !== action.payload);
      return {
        ...state,
        loaded: true,
        user,
      };
    }
    case 'BLOCK_USER_SUCCESS': {
      const { user } = state;
      user.blockedUsers = [...user.blockedUsers, action.payload];
      return {
        ...state,
        loaded: true,
        user,
      };
    }
    case ACCOUNT.LOAD_ACCOUNT_POST:
      return {
        ...state,
        posts: [],
        postLoading: true,
      };
    case ACCOUNT.LOAD_ACCOUNT_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        postLoading: false,
      };
    default:
      return state;
  }
};
