import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getLatestTweets } from './service';
import classNames from 'classnames';

import Tweet from './Tweet';
import styles from './TweetsPage.module.css';
import Page from '../layout/Page';
import Button from '../common/Button';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Be the first one!</p>
    <Button as={Link} to="/tweets/new" variant="primary">
      Create tweet
    </Button>
  </div>
);

const useTweets = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const execute = async () => {
      const tweets = await getLatestTweets();
      setTweets(tweets);
    };
    execute();
    // getLatestTweets().then(tweets => {
    //   setTweets(tweets);
    // });
  }, []);

  return tweets;
};

const TweetsPage = props => {
  const tweets = useTweets();
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

export default TweetsPage;
