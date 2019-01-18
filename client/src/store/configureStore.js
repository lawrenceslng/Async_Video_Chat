import _ from 'lodash';
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import allReducers from "../reducers";
import { loadState, saveState } from '../connectivity/localStorage';

function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    allReducers,
    loadState(),
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    saveState({
      Login: store.getState().Login,
    });
  });

 //  store.subscribe(_.throttle(() => {
 //   saveState({
 //     token: store.getState().Login.token,
 //   });
 // }, 1000));

  return store;
}

export default configureStore;
