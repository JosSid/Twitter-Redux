import { AUTH_LOGIN, AUTH_LOGOUT, TWEETS_LOADED } from "./types";

export const authLogin = () => ({
    type: AUTH_LOGIN,
});

export const authLogout = () => ({
    type: AUTH_LOGOUT
});

export const tweetsLoaded = (tweets) => ({
    type: TWEETS_LOADED,
    payload: tweets
});