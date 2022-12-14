// { estado
// auth: true/false
// twets: []
// }

import { AUTH_LOGIN, AUTH_LOGOUT, TWEETS_LOADED } from './types';

const defaultState = {
  auth: false,
  tweets: [],
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
    case AUTH_LOGIN:
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

// export default function reducer(state = defaultState, action) {
//   return {
//     auth: auth(state.auth, action),
//     tweets: tweets(state.tweets, action),
//   };
// };
