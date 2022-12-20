import { areTweetsLoaded } from "./selectors";
import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCES, AUTH_LOGOUT,  TWEETS_LOADED_FAILURE, TWEETS_LOADED_REQUEST, TWEETS_LOADED_SUCCES, UI_RESET_ERROR } from "./types";

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST,
});

export const authLoginSucces = () => ({
    type: AUTH_LOGIN_SUCCES,
});

export const authLoginFailure = (error) => ({
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true
});

export const authLogin = (credentials) => {
    return async function(dispatch, getState, { api }) {
        try {
            dispatch(authLoginRequest());
            await api.auth.login(credentials);
            dispatch(authLoginSucces());
        } catch (error) {
            dispatch(authLoginFailure(error));
            throw error;
        };
    };
};

export const authLogout = () => ({
    type: AUTH_LOGOUT
});

export const tweetsLoadedRequest = () => ({
    type: TWEETS_LOADED_REQUEST
});

export const tweetsLoadedSucces = (tweets) => ({
    type: TWEETS_LOADED_SUCCES,
    payload: tweets
});

export const tweetsLoadedFailure = (error) => ({
    type: TWEETS_LOADED_FAILURE,
    payload: error,
    error: true,
});

export const tweetsLoad = () => {
    return async function(dispatch, getState, { api }) {
        const areLoaded = areTweetsLoaded(getState());
        if(areLoaded) return;
        try {
            dispatch(tweetsLoadedRequest());
            const tweets = await api.tweets.getLatestTweets();
            dispatch(tweetsLoadedSucces(tweets))
        } catch (error) {
            dispatch(tweetsLoadedFailure(error));
            throw error
        };
    };
}

export const uiResetError = () => ({
    type: UI_RESET_ERROR
})