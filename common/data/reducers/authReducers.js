import { AUTH } from '../actions/types';

const INITIAL_STATE = {
  userAuth: undefined,
  token: undefined,
  error: undefined,
  loaded: false,
  redirect: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH.INIT_LOGIN:
      return INITIAL_STATE;
    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        userAuth: action.payload,
      };

    case AUTH.SIGNUP_SUCCESS:
      return {
        ...state,
        error: undefined,
        userAuth: action.payload,
      };
    case AUTH.LOGIN_FAIL:
    case AUTH.SIGNUP_FAIL:
      return {
        ...INITIAL_STATE,
        error: action.payload,
        loaded: true,
      };
    case AUTH.CLEAR_ERROR:
      return {
        ...state,
        error: undefined,
      };
    case AUTH.SET_IDTOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case AUTH.SET_IDTOKEN_FAIL:
      return INITIAL_STATE;
    case AUTH.LOGOUT:
      return {
        ...INITIAL_STATE,
        loaded: true,
      };
    case AUTH.REDIRECT_AFTER_ONBOARDING:
      return {
        ...state,
        redirect: action.payload,
      };
    default:
      return state;
  }
};
