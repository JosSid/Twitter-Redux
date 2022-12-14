import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { AuthContextProvider } from './components/auth/context';

//import { createStore } from 'redux';

function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return function unsuscribe(){
      listeners =listeners.filter(l => l !== listener)
    };
  };

  dispatch({type: 'INIT'});

  return {
    getState,dispatch,subscribe
  };
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      // return new state
      return state + 1;
    case DECREMENT:
      // return new state
      return state -1;
    default:
      //return state
      return state;
  }
}

const store = createStore(reducer);

console.log({store});

const showState = () => console.log(store.getState());

const unsubscribe = store.subscribe(showState);
showState();

store.dispatch({type: INCREMENT});
store.dispatch({type: INCREMENT});
store.dispatch({type: DECREMENT});
unsubscribe();
store.dispatch({type: 'NOT_KNOW'});


const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider isInitiallyLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
);
