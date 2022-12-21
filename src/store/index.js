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
};

const failuredRedirections = (router, redirections) => store => next => action => {
    const result = next(action);

    if(action.error){
        
        const redirection = redirections[action.payload.status]
        if(redirection){
            router.navigate(redirection);
        }
    }
    
    return result;
}


export default function configureStore (preloadedState, {router}) {
    const middlewares = [thunk.withExtraArgument({api: {auth,tweets}, router}), failuredRedirections(router, {
        401: '/login',
        404: '/404'
    }), logger];
    const store = createStore(reducer, preloadedState,   composeWithDevTools(applyMiddleware(...middlewares)));

    return store;
};