import { Base64 } from 'js-base64';
import { CHATS, CHAT } from './types';
import firebase from '../../../src/firebase';
import 'firebase/firestore';
import 'firebase/functions';
import api from '../../api';
import { generatePushID } from '../genId';

const firestore = firebase.firestore();
const fireFunction = firebase.functions();

export const initChats = () => (dispatch) => {
  dispatch({
    type: CHATS.INIT_CHATS,
  });
};

const regex = /^([a-z]*)(\d*)/i;

function sortFn(a, b) {
  // eslint-disable-next-line no-underscore-dangle
  const _a = a.match(regex);
  // eslint-disable-next-line no-underscore-dangle
  const _b = b.match(regex);

  // if the alphabetic part of a is less than that of b => -1
  if (_a[1] < _b[1]) {
    return -1;
  }
  // if the alphabetic part of a is greater than that of b => 1
  if (_a[1] > _b[1]) {
    return 1;
  }

  // if the alphabetic parts are equal, check the number parts
  // eslint-disable-next-line radix,no-underscore-dangle
  const _n = parseInt(_a[2]) - parseInt(_b[2]);
  if (_n === 0) {
    // if the number parts are equal start a recursive test on the rest
    return sortFn(a.substr(_a[0].length), b.substr(_b[0].length));
  }
  // else, just sort using the numbers parts
  return _n;
}

export const createChat = (chatUsers) => async () => {
  const participantsInfo = chatUsers;
  const participants = chatUsers.map((user) => user.id);
  const orderedArr = participants.sort(sortFn);
  const bigString = orderedArr.join('');
  let encodedString = Base64.encode(bigString);
  if (chatUsers.length > 2) {
    encodedString = generatePushID();
  }
  let document = await firestore
    .collection('chats')
    .doc(encodedString)
    .get();
  if (document && document.exists) {
    await document.ref.update({
      updated: new Date().toISOString(),
    });
  } else {
    await document.ref.set(
      {
        id: encodedString,
        participantsInfo,
        participants,
        lastMessage: {},
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      { merge: true },
    );
  }

  document = await firestore
    .collection('chatsContent')
    .doc(encodedString)
    .get();
  if (document && document.exists) {
    await document.ref.update({
      updated: new Date().toISOString(),
    });
  } else {
    await document.ref.set(
      {
        id: encodedString,
        participantsInfo,
        participants,
        messages: [],
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      { merge: true },
    );
  }

  return encodedString;
};

export const sendMessage = (
  chatId,
  message,
  messageSender,
  messageRecipients,
) => async () => {
  messageRecipients.map(async (recipient) => {
    if (recipient.id !== messageSender.id) {
      await firestore
        .collection('notifications')
        .doc(recipient.id)
        .set({
          messages: {
            [chatId]: firebase.firestore.FieldValue.increment(1),
          },
        }, { merge: true });
    }
  });
  let document = await firestore
    .collection('chats')
    .doc(chatId)
    .get();
  if (document && document.exists) {
    await document.ref.update({
      lastMessage: message,
    });
  } else {
    // throw error
  }

  document = await firestore
    .collection('chatsContent')
    .doc(chatId)
    .get();
  if (document && document.exists) {
    await document.ref.update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
      updated: new Date().toISOString(),
    });

    const sendChatMessageCall = fireFunction
      .httpsCallable('appChatMessageChatUsers');
    sendChatMessageCall({
      messageSender,
      messageRecipients,
      messageType: 'chatMessage',
      message,
      displayInChat: false,
    })
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        console.log('error', error);
      });
  } else {
    // throw error
  }
};

// eslint-disable-next-line no-unused-vars
export const updateLastRead = (chatId, userId, message) => async (dispatch) => {
  const document = await firestore
    .collection('chats')
    .doc(chatId)
    .collection('lastRead')
    .doc(userId)
    .get();
  if (document && document.exists) {
    await document.ref.update(message);
  } else {
    await document.ref.set(message);
  }
};

export const loadChatUsersSuccess = (dispatch, users) => {
  dispatch({
    type: CHAT.LOAD_CHAT_USERS_SUCCESS,

    payload: users || [],
  });
};

export const getChatUsers = (userIds) => async (dispatch) => {
  const url = 'user/onesignal';
  const postBody = { userIds };

  try {
    await api.post(url, postBody).then((resp) => {
      const participants = resp.data.data;
      loadChatUsersSuccess(dispatch, participants);
    });
  } catch (err) {
    // err
  }
};


export const leaveChat = (chatId, userId) => async () => {
  const document = await firebase
    .firestore()
    .collection('chats')
    .doc(chatId)
    .get();
  if (document && document.exists) {
    await document.ref.update({
      leftChat: firebase.firestore.FieldValue.arrayUnion(userId),
    });
  } else {
    // throw error
  }
};

export const initLoadingChat = () => (dispatch) => {
  dispatch({
    type: CHAT.INIT_LOAD_CHAT,
  });
};

export const loadChatSuccess = (content) => ({
  type: CHAT.LOAD_CHAT_SUCCESS,
  payload: content || [],
});

export const loadChatFail = (error) => ({
  type: CHAT.LOAD_CHAT_FAIL,
  payload: error,
});

export const loadChatsSuccess = (chats) => ({
  type: CHATS.LOAD_CHATS_SUCCESS,
  payload: chats || [],
});

export const loadChatsFail = (error) => ({
  type: CHAT.LOAD_CHATS_FAIL,
  payload: error,
});
