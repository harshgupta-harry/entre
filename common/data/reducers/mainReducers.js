import { MAIN } from '../actions/types';

const INITIAL_STATE = {
  appModal: false,
  dismissed: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAIN.DISMISS_APP_MODAL:
      return {
        ...state,
        appModal: false,
        dismissed: true,
      };
    case MAIN.SHOW_APP_MODAL:
      return {
        ...state,
        appModal: true,
      };
    default:
      return state;
  }
};
