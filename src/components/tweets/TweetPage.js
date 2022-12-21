import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Page from '../layout/Page';

import { getTweet } from '../../store/selectors';
import { tweetLoad } from '../../store/actions';

const TweetPage = (props) => {
  const { tweetId } = useParams();
  
  const unmounteRef = useRef(false);
  const dispatch = useDispatch();

  // const tweet = useSelector((state) => getTweet(state, tweetId));
  const tweet = useSelector(getTweet(tweetId));

  useEffect(() => {
    dispatch(tweetLoad(tweetId))
  }, [dispatch, tweetId]);

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
    <Page title='Tweet detail' {...props}>
      <div>{JSON.stringify(tweet)}</div>
    </Page>
  );
};

export default TweetPage;
