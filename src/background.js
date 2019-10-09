import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import {wrapStore} from 'webext-redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import "@babel/polyfill";

import createReducer from './reducer';
import rootSaga from './sagas';

import { local } from './reducers'



let AppInitState = 0; // it means app is off on startup

class Main {
  constructor() {}
  popUpClickSetup() {
    chrome.browserAction.onClicked.addListener(tab => {
      if (this.toggleApp()) {
      } else {
        this.stopApp();
      }
    });
  }

  toggleApp = () => {
    AppInitState = AppInitState ? 0 : 1;
    return AppInitState;
  };

  stopApp = () => {
    AppInitState = 0;
  };
}


const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const enhancers = [
    applyMiddleware(...middlewares),
    persistState(['local', 'comparison']),
];


const composeEnhancers = composeWithDevTools({
  hostname: "localhost", realtime: true, port: 8000
});

const rootReducer = createReducer();
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
);

sagaMiddleware.run(rootSaga);

export default wrapStore(store, {portName:'WHATSAPPEXT'});

