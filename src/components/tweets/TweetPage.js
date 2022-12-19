import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Page from '../layout/Page';
import { getTweetDetail } from './service';
import { getTweet } from '../../store/selectors';

const TweetPage = props => {
  const { tweetId } = useParams();
  const navigate = useNavigate();
  const unmounteRef = useRef(false);

  // const tweet = useSelector((state) => getTweet(state, tweetId));
  const tweet = useSelector(getTweet(tweetId));

  // useEffect(() => {
  //   getTweetDetail(tweetId)
  //     .then(tweet => {
  //       console.log('have response');
  //       // if (unmounteRef.current) {
  //       //   console.log('do nothing');
  //       //   return;
  //       // }
  //       console.log('set state');
  //       setTweet(tweet);
  //     })
  //     .catch(error => {
  //       if (error.status === 404) {
  //         navigate('404');
  //       }
  //     });
  // }, [tweetId, navigate]);

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
