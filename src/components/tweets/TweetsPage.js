import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import {tweetsLoaded} from '../../store/actions'
import { getLatestTweets } from './service';
import classNames from 'classnames';

import Tweet from './Tweet';
import styles from './TweetsPage.module.css';
import Page from '../layout/Page';
import Button from '../common/Button';
import { connect } from 'react-redux';
import { getTweets } from '../../store/selectors';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Be the first one!</p>
    <Button as={Link} to="/tweets/new" variant="primary">
      Create tweet
    </Button>
  </div>
);

// const useTweets = () => {
//   const [tweets, setTweets] = useState([]);

//   useEffect(() => {
//     const execute = async () => {
//       const tweets = await getLatestTweets();
//       setTweets(tweets);
//     };
//     execute();
//     // getLatestTweets().then(tweets => {
//     //   setTweets(tweets);
//     // });
//   }, []);

//   return tweets;
// };

const TweetsPage = ({onTweetsLoaded, tweets, ...props}) => {
  useEffect(() => {
    const execute = async () => {
      const tweets = await getLatestTweets();
      onTweetsLoaded(tweets);
    };
    execute();
    // getLatestTweets().then(tweets => {
    //   setTweets(tweets);
    // });
  }, [onTweetsLoaded]);

  const className = classNames(styles.tweetsPage, {
    [styles.empty]: !tweets.length,
  });

  return (
    <Page title="What's going on..." {...props}>
      <div className={className}>
        {tweets.length ? (
          <ul>
            {tweets.map(tweet => (
              <li key={tweet.id}>
                <Link to={`/tweets/${tweet.id}`}>
                  <Tweet {...tweet} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

const mapStateToProps = (state, ownProps) =>({
  tweets: getTweets(state),
});

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onTweetsLoaded: (tweets) => dispatch(tweetsLoaded(tweets))
// });

const mapDispatchToProps = {
  onTweetsLoaded: tweetsLoaded
};

const connectedTweetsPage = connect(mapStateToProps, mapDispatchToProps)(TweetsPage)

export default connectedTweetsPage;
