// { estado
// auth: true/false
// twets: []
// ui: {
//    isLoading: true/false,
//    error: error/null
//    }
// }

import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCES, AUTH_LOGOUT, TWEETS_LOADED, UI_RESET_ERROR } from './types';

const defaultState = {
  auth: false,
  tweets: [],
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
    if(action.type === TWEETS_LOADED) {
        return action.payload;
    };
    return state;
};

export function ui(state = defaultState.ui, action){
  switch(action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        error: null,
        isLoading: true
      };
    case AUTH_LOGIN_SUCCES:
      return {
        error: null,
        isLoading: false
      };
    case AUTH_LOGIN_FAILURE: 
    return {
      isLoading: false,
      error: action.payload
    };
    case UI_RESET_ERROR:
      return {
        ...state,
        error: null
      }
      default:
        return state;
  };
};

// export default function reducer(state = defaultState, action) {
//   return {
//     auth: auth(state.auth, action),
//     tweets: tweets(state.tweets, action),
//   };
// };
