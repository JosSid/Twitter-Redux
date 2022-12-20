import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as auth from "../components/auth/service";
import * as tweets from "../components/tweets/service";
//import  {auth, tweets } from './reducers';

import * as reducers from './reducers';

//const reducer = combineReducers( {auth, tweets });
const reducer = combineReducers(reducers);

/* const thunk = store => next => action => {
    if(typeof action === 'function'){
        return action(store.dispatch, store.getState)
    };
    return next(action);
}; */

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action, store.getState());
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
}

const middlewares = [thunk.withExtraArgument({api: {auth,tweets}}), logger];

export default function configureStore (preloadedState) {
    const store = createStore(reducer, preloadedState,   composeWithDevTools(applyMiddleware(...middlewares)));

    return store;
};