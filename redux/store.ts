// referenced from using next with redux:
// https://github.com/vercel/next.js/blob/canary/examples/with-redux/store.js

import {useMemo} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import {IRootState} from './rootStateInterface';

let store: any;
const persistConfig = {
  key: 'registration',
  storage,
  whitelist: ['registrationReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function initStore(preloadedState: IRootState) {
  return createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  );
}

export const initializeStore = (preloadedState: IRootState) => {
  // eslint-disable-next-line no-underscore-dangle
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: IRootState) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return store;
}
