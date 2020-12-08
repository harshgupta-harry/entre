/* eslint-disable import/prefer-default-export */
import { ACCOUNT } from './types';
import { getStore } from '../../../store';
import firebase from '../../../src/firebase';
import api from '../../api';
import newApi from '../../api/newApi';

const loadAccountFail = (dispatch, error) => {
  dispatch({
    type: ACCOUNT.LOAD_ACCOUNT_FAIL,
    payload: error,
  });
};

const loadAccountSuccess = (dispatch, account) => {
  if (account && account.id) {
    window.analytics.identify({
      userId: account.id,
      traits: {
        email: account.email,
        fullName: account.fullName,
        username: account.username,
      },
    });
  }
  dispatch({
    type: ACCOUNT.LOAD_ACCOUNT_SUCCESS,
    payload: account || [],
  });
};

export const loadAccount = (userId) => async (dispatch) => {
  const resp = await api.get(`user/${userId}`, {});
  if (resp.data.data) {
    const user = resp.data.data[0];
    loadAccountSuccess(dispatch, user);
  } else {
    loadAccountFail(dispatch, resp.data.errorMessage);
  }
  return resp;
};

export const loadIndustries = () => async (dispatch) => {
  const { account } = getStore().getState();
  if (account.industriesLoading) return;
  dispatch({
    type: ACCOUNT.LOAD_INDUSTRIES,
  });
  const resp = await api.get('industry', {});
  const industries = resp.data.data;
  if (resp) {
    dispatch({
      type: ACCOUNT.LOAD_INDUSTRIES_SUCCESS,
      payload: industries || [],
    });
  } else {
    // loadIndustriesFail(dispatch, resp);
  }
};

export const loadTitles = () => async (dispatch) => {
  const { account } = getStore().getState();
  if (account.titlesLoading) return;
  dispatch({
    type: ACCOUNT.LOAD_TITLES,
  });
  const resp = await api.get('user/title', {});
  const { titles } = resp.data.data;

  if (resp) {
    dispatch({
      type: ACCOUNT.LOAD_TITLES_SUCCESS,
      payload: titles || [],
    });
  } else {
    // loadIndustriesFail(dispatch, resp);
  }
};

export const loadConnections = (offset = 0, limit = 10) => async (dispatch) => {
  const { account } = getStore().getState();
  if (account.connectionsLoading) return;
  dispatch({
    type: ACCOUNT.LOAD_CONNECTIONS,
  });
  const resp = await newApi.get(`user/connections?limit=${limit}&offset=${offset}`, {});
  const connections = resp.data;

  if (resp) {
    dispatch({
      type: ACCOUNT.LOAD_CONNECTIONS_SUCCESS,
      payload: connections || [],
    });
  } else {
    // loadIndustriesFail(dispatch, resp);
  }
};

// eslint-disable-next-line max-len
export const updateEmailOrPassword = (email, password, oldEmail, oldPassword) => async (dispatch) => {
  const { auth } = getStore().getState();
  if (!oldPassword) {
    return { error: 'Your current password is required to update sensitive information' };
  }

  if (email || password) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(oldEmail, oldPassword);
      const user = firebase.auth().currentUser;
      if (email && oldEmail !== email) {
        try {
          await user.updateEmail(email);
          const response = await api.put('user', { email });
          if (response.data.error) {
            return { error: 'Cannot update account info' };
          }
          await dispatch(loadAccount(auth.userAuth.uid));
          return { message: 'Update successful' };
        } catch (err) {
          return { error: 'Cannot update email, it might be already in use' };
        }
      }

      if (password) {
        try {
          await user.updatePassword(password);
          return { message: 'Update successful' };
        } catch (err) {
          return { error: 'Cannot update account info' };
        }
      }
    } catch (err) {
      return { error: 'Invalid current password' };
    }
  } else {
    return { error: 'Email or new password are required' };
  }
  return {};
};

export const deleteAccount = (oldEmail, oldPassword) => async () => {
  if (!oldPassword) {
    return { error: 'Your current password is required to delete your account' };
  }

  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(oldEmail, oldPassword);

    // const user = firebase.auth().currentUser;

    // await user.updateProfile({ disabled: true });
    const response = await api.delete('user');
    console.log(response);
    if (response.data.error) {
      return { error: 'Cannot delete account' };
    }
    firebase.auth().signOut();
    return { message: 'Account was deleted' };
  } catch (err) {
    return { error: 'Invalid current password' };
  }
};

export const updateAccount = (updateInfo) => async (dispatch) => {
  const { auth } = getStore().getState();
  dispatch({
    type: ACCOUNT.UPDATE_ACCOUNT,
  });

  const data = updateInfo;

  if (updateInfo.avatar) { // only if image was changed...
    const base64String = updateInfo.avatar.split(',')[1];
    const fileUploadResponse = await api.post('upload', { base64String });
    if (fileUploadResponse.data.errorMessage) {
      // console.log(fileUploadResponse.data.errorMessage);
      return;
    }
    data.avatar = fileUploadResponse.data.data;
  }

  const response = await api.put('user', data);
  if (response.data.error) {
    dispatch({
      type: ACCOUNT.UPDATE_ACCOUNT_FAIL,
      payload: response,
    });
  } else {
    await dispatch(loadAccount(auth.userAuth.uid));
    dispatch({
      type: ACCOUNT.UPDATE_ACCOUNT_SUCCESS,
      payload: response,
    });
  }
};

export const checkEmail = async (email) => {
  const strategy = await firebase.auth().fetchSignInMethodsForEmail(email);
  return strategy.length > 0;
};

export const createStripeIntent = async (email, metadata, ticketId) => {
  const response = await newApi.post('stripe/pay-ticket', { email, metadata, ticketId });
  return response;
};

export const createStripeCustomer = async (email, metadata) => {
  const response = await newApi.post('stripe/create-customer', { email, metadata });
  return response;
};

export const createStripeSubscription = async (customerId, paymentMethodId, priceId) => {
  const response = await newApi.post('stripe/create-subscription', {
    customerId,
    paymentMethodId,
    priceId,
  });
  return response;
};

export const getStripeCard = async (paymentMethodId) => {
  const response = await newApi.post('stripe/retrieve-customer-payment-method', { paymentMethodId });
  return response;
};

export const setPro = (isPro, paypalTransaction) => async (dispatch) => {
  const { auth } = getStore().getState();
  await api.put('user/entrepro', { isPro });
  await api.post('payment/subscribe', paypalTransaction);
  await dispatch(loadAccount(auth.userAuth.uid));
};

const loadAccountPostSuccess = (dispatch, posts) => {
  dispatch({
    type: ACCOUNT.LOAD_ACCOUNT_POST_SUCCESS,
    payload: posts || [],
  });
};

export const loadAccountPosts = (userId) => async (dispatch) => {
  const { account } = getStore().getState();
  if (account.postLoading) return;
  dispatch({
    type: ACCOUNT.LOAD_ACCOUNT_POST,
  });
  const resp = await api.get(`user/${userId}/post`, {});
  if (resp.data.data) {
    const posts = resp.data.data;
    loadAccountPostSuccess(dispatch, posts);
  } else {
    loadAccountFail(dispatch, resp.data.errorMessage);
  }
};
