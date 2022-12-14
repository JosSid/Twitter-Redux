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
  
  const increment = step => ({
    type: INCREMENT,
    payload: step,
    meta: {
      timestamp: new Date()
    }
  });
  
  const decrement = () => ({
    type: DECREMENT
  });
  
  store.dispatch(increment());
  store.dispatch(increment());
  store.dispatch(decrement());
  unsubscribe();
  store.dispatch({type: 'NOT_KNOW'});
  