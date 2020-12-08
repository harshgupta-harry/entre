import Router from 'next/router';
import {
  AUTH,
} from './types';
import firebase from '../../../src/firebase';
import api from '../../api';
import { loadAccount } from './accountActions';

const logoutSuccess = (dispatch) => {
  dispatch({
    type: AUTH.LOGOUT,
    payload: true,
  });
};

const loginSuccess = async (dispatch, currentUser) => {
  dispatch({
    type: AUTH.LOGIN_SUCCESS,
    payload: currentUser || [],
  });
};

const loginFail = (dispatch, error) => {
  dispatch({
    type: AUTH.LOGIN_FAIL,
    payload: error,
  });
};

export const signupFail = (error) => async (dispatch) => {
  dispatch({
    type: AUTH.SIGNUP_FAIL,
    payload: error,
  });
};

export const updateIdToken = (idToken) => async (dispatch) => {
  dispatch({
    type: AUTH.SET_IDTOKEN_SUCCESS,
    payload: idToken || undefined,
  });
  const currentUser = await firebase.auth().currentUser;
  dispatch(loadAccount(currentUser.uid));
};

export const checkSession = () => (dispatch) => {
  try {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        loginSuccess(dispatch, user);
        const idToken = await user.getIdToken();
        await dispatch(updateIdToken(idToken));
      } else {
        logoutSuccess(dispatch);
      }
    });
  } catch (err) {
    // console.log("EE", err);
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: AUTH.CLEAR_ERROR });
};

export const redirectAfterOnboarding = (pathname) => async (dispatch) => {
  dispatch({
    type: AUTH.REDIRECT_AFTER_ONBOARDING,
    payload: pathname,
  });
};

export const emailLogin = (email, password, redirect = false) => async (dispatch) => {
  if (!email || !password) {
    loginFail(dispatch, 'REQUIRED_USER_AND_PASS');
    return;
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (response) => {
      const userAuth = response;
      loginSuccess(dispatch, userAuth);
      const idToken = await response.user.getIdToken();
      if (redirect) await dispatch(redirectAfterOnboarding(redirect));
      await dispatch(updateIdToken(idToken));
    })
    .catch((error) => {
      const errorCode = error.code;
      if (
        errorCode === 'auth/wrong-password'
          || errorCode === 'auth/user-not-found'
          || errorCode === 'auth/invalid-email'
          || errorCode === 'auth/user-disabled'
      ) {
        loginFail(dispatch, 'WRONG_USER_OR_PASS');
      } else {
        loginFail(dispatch, errorCode);
      }
    });
};

export const checkForUsername = (username) => async () => {
  const response = await api.get(`user/check?username=${username}`);
  return response.data.data.isUserPresent;
};

export const recoverPass = (email) => async () => {
  await api.get(`password?email=${email}`, {});
};

export const resetPass = (secToken, password) => async () => (
  api.post('password', {
    uniqueId: secToken,
    password,
  })
);

export const emailSignup = (newUser, redirect = false) => async (dispatch) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    const userAuth = response;
    const idToken = await response.user.getIdToken();
    try {
      await api.post('user/register', {
        displayName: newUser.fullName,
        fullName: newUser.fullName,
        email: newUser.email,
        username: newUser.username,
        idToken,
      });
    } catch (err) {
      // Do something with error
    }

    // await dispatch(loadIndustries());
    // await dispatch(loadTitles());
    if (redirect) await dispatch(redirectAfterOnboarding(redirect));
    loginSuccess(dispatch, userAuth.user);
    await dispatch(updateIdToken(idToken));
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/weak-password') {
      dispatch(signupFail('WEAK_PASSWORD'));
    } else if (errorCode === 'auth/email-already-in-use') {
      dispatch(signupFail('DUPLICATED_EMAIL'));
    } else {
      dispatch(signupFail(errorCode));
    }
  }
};

export const logOut = () => async () => {
  firebase.auth().signOut();
  Router.push('/');
};
