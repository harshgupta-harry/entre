import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

let store;

function makeStore(initialState = {}, persistedReducer) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

export const initializeStore = (preloadedState, persistedReducer) => {
  let storeInst = store ?? makeStore(preloadedState, persistedReducer);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    storeInst = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return storeInst;
  // Create the store once in the client
  if (!store) store = storeInst;

  return storeInst;
};

export function useStore(initialState, persistedReducer) {
  const storeInst = useMemo(() => initializeStore(initialState, persistedReducer), [initialState]);
  return storeInst;
}

export function getStore() {
  return store;
}
