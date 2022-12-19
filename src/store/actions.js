import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCES, AUTH_LOGOUT, TWEETS_LOADED, UI_RESET_ERROR } from "./types";

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

export const authLogout = () => ({
    type: AUTH_LOGOUT
});

export const tweetsLoaded = (tweets) => ({
    type: TWEETS_LOADED,
    payload: tweets
});

export const uiResetError = () => ({
    type: UI_RESET_ERROR
})