import { useMemo, useState } from 'react';

import Button from '../common/Button';
import FormField from '../common/FormField';


import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, uiResetError } from '../../store/actions'
import { getUi } from '../../store/selectors';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const handleChangeUsername = event => setUsername(event.target.value);
  const handleChangePassword = event => setPassword(event.target.value);
  const handleResetError = () => dispatch(uiResetError())

  const handleSubmit = event => {
    event.preventDefault();

   dispatch(authLogin({username, password})).then(() => {
    
   });

  } 


  console.log('render ');
  const isButtonEnabled = useMemo(() => {
    console.log('calculating');
    return username && password && !isLoading;
  }, [username, password, isLoading]);

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="phone, email or username"
          className="loginForm-field"
          onChange={handleChangeUsername}
          value={username}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChangePassword}
          value={password}
        />
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={!isButtonEnabled}
        >
          Log in
        </Button>

        {/* <input
          type="checkbox"
          onChange={event => {
            console.log(event.target.checked);
          }}
          // value={remember}
        />
        <input
          type="file"
          onChange={event => console.log(event.target.files)}
        />
        <select
          // value={fruit}
          onChange={event => console.log(event.target.value)}
        >
          <option value="orange">Orange</option>
          <option value="apple">Apple</option>
        </select> */}
      </form>
      {error && (
        <div onClick={handleResetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
