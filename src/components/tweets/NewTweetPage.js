import Page from '../layout/Page';
import Photo from '../common/Photo';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { getUi } from '../../store/selectors';
import './NewTweetPage.css';
import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { tweetCreate } from '../../store/actions';

const MAX_CHARACTERS = 280;
const MIN_CHARACTERS = 5;

const NewTweetPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getUi)
  const [content, setContent] = useState('');
  
  const textareaRef = useRef();
  const rendersRef = useRef(0);

  rendersRef.current++;
  console.log(rendersRef.current);

  useEffect(() => {
    // console.log(textareaRef);
    textareaRef.current.focus();
  }, []);

  const handleChange = event => setContent(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(tweetCreate({content}));

  };

  const characters = `${content.length} / ${MAX_CHARACTERS}`;
  const buttonEnabled = content.length >= MIN_CHARACTERS && !isLoading;

  return (
    <Page title="What are you thinking...">
      <div className="newTweetPage bordered">
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <Textarea
              className="newTweetPage-textarea"
              placeholder="Hey! What's up!"
              maxLength={MAX_CHARACTERS}
              value={content}
              onChange={handleChange}
              autofocus
              ref={textareaRef}
            />
            <div className="newTweetPage-footer">
              <span className="newTweetPage-characters">{characters}</span>
              <Button
                type="submit"
                className="newTweetPage-submit"
                variant="primary"
                disabled={!buttonEnabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default NewTweetPage;
