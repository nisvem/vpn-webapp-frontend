import { createStore, combineReducers, StoreEnhancer } from 'redux';
import user from '../reducers/user';

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<never, object>;
};

const isReduxDevtoolsExtenstionExist = (
  arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
  return '__REDUX_DEVTOOLS_EXTENSION__' in arg;
};

const store = createStore(
  combineReducers(user),
  isReduxDevtoolsExtenstionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default store;
