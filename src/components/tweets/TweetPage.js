import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Page from '../layout/Page';
import { getTweetDetail } from './service';

const TweetPage = props => {
  const [tweet, setTweet] = useState(null);
  const { tweetId } = useParams();
  const navigate = useNavigate();
  const unmounteRef = useRef(false);

  useEffect(() => {
    getTweetDetail(tweetId)
      .then(tweet => {
        console.log('have response');
        // if (unmounteRef.current) {
        //   console.log('do nothing');
        //   return;
        // }
        console.log('set state');
        setTweet(tweet);
      })
      .catch(error => {
        if (error.status === 404) {
          navigate('404');
        }
      });
  }, [tweetId, navigate]);

  useEffect(() => {
    return () => {
      unmounteRef.current = true;
    };
  }, []);

  return (
    <Page title="Tweet detail" {...props}>
      <div>{JSON.stringify(tweet)}</div>
    </Page>
  );
};

export default TweetPage;
