export const getIsLogged = state => state.auth;

export const getTweets = state => state.tweets;

//export const getTweet = (state, tweetId) => getTweets(state).find(tweet => tweet.id.toString() === tweetId);

// export function getTweets (state, tweetId) {
//     return getTweets(state).find(tweet => tweet.id.toString() === tweetId);
// };

// export function getTweet(tweetId) {
//     return function(state){
//         return getTweets(state).find(tweet => tweet.id.toString() === tweetId);
//     };
// };

export const getTweet = tweetId => state => getTweets(state).find(tweet => tweet.id.toString() === tweetId);