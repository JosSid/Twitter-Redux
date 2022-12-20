export const getIsLogged = state => state.auth;

export const getTweets = state => state.tweets.areLoaded ? state.tweets.data : [];

export const areTweetsLoaded = state => state.tweets.areLoaded;

//export const getTweet = (state, tweetId) => getTweets(state).find(tweet => tweet.id.toString() === tweetId);

// export function getTweets (state, tweetId) {
//     return getTweets(state).find(tweet => tweet.id.toString() === tweetId);
// };

// export function getTweet(tweetId) {
//     return function(state){
//         return getTweets(state).find(tweet => tweet.id.toString() === tweetId);
//     };
// };

export const getTweet = tweetId => state => state.tweets.data.find(tweet => tweet.id.toString() === tweetId);

export const getUi = state => state.ui;