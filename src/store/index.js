import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
//import thunk from 'redux-thunk';
//import  {auth, tweets } from './reducers';

import * as reducers from './reducers';

//const reducer = combineReducers( {auth, tweets });
const reducer = combineReducers(reducers);

const thunk = store => next => action => {
    if(typeof action === 'function'){
        return action(store.dispatch, store.getState)
    };
    return next(action);
};

const middlewares = [thunk];

export default function configureStore (preloadedState) {
    const store = createStore(reducer, preloadedState,   composeWithDevTools(applyMiddleware(...middlewares)));

    return store;
};