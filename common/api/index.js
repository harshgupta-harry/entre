import axios from 'axios';
import { getStore } from '../../store';
import firebase from '../../src/firebase';

const BASE_URL = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  params: {},
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosOther = axios.create({
  timeout: 120000,
  params: {},
  headers: {
    'Content-Type': 'application/json',
  },
});

const tokenExpired = () => {
  const authHeader = axiosInstance.defaults.headers.common.Authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const [, body] = token.split('.');
    const decodedData = window.atob(body);
    const data = JSON.parse(decodedData);
    if (Date.now() >= data.exp * 1000) {
      return true;
    }
  }
  return false;
};

const processResponse = async (fn, args) => {
  try {
    if (tokenExpired()) {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        getStore().dispatch({
          type: 'SET_IDTOKEN_SUCCESS',
          payload: idToken || undefined,
        });
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${idToken}`;
      }
    }
    const response = await fn(...args);
    return response;
  } catch (err) {
    return {
      data: {
        error: err.message,
      },
    };
  }
};

export default {
  setToken: (token) => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  },
  axiosOther,
  async get(resource) {
    return processResponse(axiosInstance.get, [`${BASE_URL}/${resource}`]);
  },
  async post(resource, body) {
    return processResponse(axiosInstance.post, [`${BASE_URL}/${resource}`, body]);
  },
  async patch(resource, body) {
    return processResponse(axiosInstance.patch, [`${BASE_URL}/${resource}`, body]);
  },
  async put(resource, body) {
    return processResponse(axiosInstance.put, [`${BASE_URL}/${resource}`, body]);
  },
  async delete(resource, body) {
    return processResponse(axiosInstance.delete, [`${BASE_URL}/${resource}`, body]);
  },
  async upload(resource, body) {
    return processResponse(axiosInstance.post, [`${BASE_URL}/${resource}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }]);
  },
};
