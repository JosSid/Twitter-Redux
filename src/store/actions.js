import { areTweetsLoaded, getTweet } from './selectors';
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCES,
  AUTH_LOGOUT,
  TWEETS_LOADED_FAILURE,
  TWEETS_LOADED_REQUEST,
  TWEETS_LOADED_SUCCES,
  TWEET_LOADED_REQUEST,
  TWEET_LOADED_SUCCES,
  TWEET_LOADED_FAILURE,
  TWEET_CREATED_REQUEST,
  TWEET_CREATED_SUCCES,
  TWEET_CREATED_FAILURE,
  UI_RESET_ERROR,
} from './types';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSucces = () => ({
  type: AUTH_LOGIN_SUCCES,
});

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const authLogin = (credentials) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(authLoginRequest());
      await api.auth.login(credentials);
      dispatch(authLoginSucces());
     
      const to = router.state.location.state?.from?.pathname || '/';

      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
};

export const authLogoutSucces = () => ({
  type: AUTH_LOGOUT,
});

export const authLogout = () => {
  return async function (dispatch, getState, { api }) {
    await api.auth.logout();
    dispatch(authLogoutSucces());
  };
};

export const tweetsLoadedRequest = () => ({
  type: TWEETS_LOADED_REQUEST,
});

export const tweetsLoadedSucces = (tweets) => ({
  type: TWEETS_LOADED_SUCCES,
  payload: tweets,
});

export const tweetsLoadedFailure = (error) => ({
  type: TWEETS_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const tweetsLoad = () => {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areTweetsLoaded(getState());
    if (areLoaded) return;
    try {
      dispatch(tweetsLoadedRequest());
      const tweets = await api.tweets.getLatestTweets();
      dispatch(tweetsLoadedSucces(tweets));
    } catch (error) {
      dispatch(tweetsLoadedFailure(error));
      throw error;
    }
  };
};

export const tweetLoadedRequest = () => ({
  type: TWEET_LOADED_REQUEST,
});

export const tweetLoadedSucces = (tweet) => ({
  type: TWEET_LOADED_SUCCES,
  payload: tweet,
});

export const tweetLoadedFailure = (error) => ({
  type: TWEET_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const tweetLoad = (tweetId) => {
  return async function (dispatch, getState, { api, router }) {
    const isLoaded = getTweet(tweetId)(getState());
    if (isLoaded) return;
    try {
      dispatch(tweetLoadedRequest());
      const tweet = await api.tweets.getTweetDetail(tweetId);
      dispatch(tweetLoadedSucces(tweet));
    } catch (error) {
      dispatch(tweetLoadedFailure(error));if (error.status === 404) {
        router.navigate('/404');
      }
      
    }
  };
};

export const tweetCreatedRequest = () => ({
  type: TWEET_CREATED_REQUEST,
});

export const tweetCreatedSucces = (tweet) => ({
  type: TWEET_CREATED_SUCCES,
  payload: tweet,
});

export const tweetCreatedFailure = (error) => ({
  type: TWEET_CREATED_FAILURE,
  payload: error,
  error: true,
});

export const tweetCreate = (tweet) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(tweetCreatedRequest());
      const { id } = await api.tweets.createTweet(tweet);
      const createdTweet = await api.tweets.getTweetDetail(id);
      dispatch(tweetCreatedSucces(createdTweet));
      router.navigate(`/tweets/${createdTweet.id}`);
      return createdTweet;
    } catch (error) {
      dispatch(tweetCreatedFailure(error));
      if (error.status === 401) {
        router.navigate('/login');
      }
      throw error;
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
