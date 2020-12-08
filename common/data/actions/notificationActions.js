import { NOTIFICATIONS } from './types';

import firebase from '../../../src/firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

export const initNotifications = () => (dispatch) => {
  dispatch({
    type: NOTIFICATIONS.INIT_NOTIFICATIONS,
  });
};


export const incrementCounter = (
  userId,
) => async () => {
  const document = await firestore
    .collection('notifications')
    .doc(userId)
    .get();
  if (document && document.exists) {
    await document.ref.update({
      job_application: 'test',
    });
  } else {
    // throw error
  }
};
