import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
//import  {auth, tweets } from './reducers';

import * as reducers from './reducers';

//const reducer = combineReducers( {auth, tweets });
const reducer = combineReducers(reducers);

export default function configureStore (preloadedState) {
    const store = createStore(reducer, preloadedState,   composeWithDevTools());

    return store;
};