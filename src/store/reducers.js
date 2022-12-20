// { estado
// auth: true/false
// twets: []
// ui: {
//    isLoading: true/false,
//    error: error/null
//    }
// }

import { AUTH_LOGIN_SUCCES, AUTH_LOGOUT, TWEETS_LOADED_SUCCES, TWEET_LOADED_SUCCES, UI_RESET_ERROR } from './types';

const defaultState = {
  auth: false,
  tweets: {
    areLoaded: false,
    data: []
  },
  ui: {
    isLoading: false,
    error: null
  }
};

// export default function reducer(state = defaultState, action) {
//   switch (action.type) {
//     case AUTH_LOGIN:
//         return { ...state, auth: true };
//     case AUTH_LOGOUT:
//         return { ...state, auth: false };
//     case TWEETS_LOADED:
//         return { ...state, tweets: action.payload}
//     default:
//       return state;
//   }
// };

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCES:
      return true;
    case AUTH_LOGOUT:
        return false;
    default:
      return state;
  };
};

export function tweets(state = defaultState.tweets, action) {
    if(action.type === TWEETS_LOADED_SUCCES) {
        return { areLoaded: true, data: action.payload };
    };
    if(action.type === TWEET_LOADED_SUCCES) {
      return { ...state, data: [...state.data, action.payload] }
    }
    return state;
};

export function ui(state = defaultState.ui, action){
  if(action.error){
    return {
      isLoading: false,
      error: action.payload
    };
  };
  if(/_REQUEST$/.test(action.type)){
    return {
      error: null,
      isLoading: true
    };
  };
  if(/_SUCCES$/.test(action.type)){
    return {
      error: null,
      isLoading: false
    };
  }
  if(action.type === UI_RESET_ERROR) {
    return {
      ...state,
      error: null
    }
  }

  return state;

};

// export default function reducer(state = defaultState, action) {
//   return {
//     auth: auth(state.auth, action),
//     tweets: tweets(state.tweets, action),
//   };
// };
