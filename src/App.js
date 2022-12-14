import { Routes, Route, Navigate } from 'react-router-dom';

import TweetsPage from './components/tweets/TweetsPage';
import NewTweetPage from './components/tweets/NewTweetPage';
import TweetPage from './components/tweets/TweetPage';
import RequireAuth from './components/auth/RequireAuth';
import Layout from './components/layout/Layout';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./components/auth/LoginPage'));

function App() {
  return (
    <Suspense fallback="loading page...">
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tweets" element={<Layout />}>
            <Route index element={<TweetsPage />} />
            <Route path=":tweetId" element={<TweetPage />} />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <NewTweetPage />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/" element={<Navigate to="/tweets" />} />
          <Route path="/404" element={<div>404 | Not found</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
