import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';

//import './store-poc';
import configureStore from './store';
import Root from './Root';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const router = createBrowserRouter([{
  path: '*', element: <App />
}]);

const store = configureStore({ auth: !!accessToken }, {router});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root store={store} router={router}/>
  </React.StrictMode>
);
