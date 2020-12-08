/* eslint-disable import/prefer-default-export */
import { MAIN } from './types';

export const dismissAppModal = () => async (dispatch) => {
  document.body.style.overflow = 'auto';
  dispatch({
    type: MAIN.DISMISS_APP_MODAL,
  });
};

export const showAppModal = () => async (dispatch) => {
  document.body.style.overflow = 'hidden';
  dispatch({
    type: MAIN.SHOW_APP_MODAL,
  });
};
