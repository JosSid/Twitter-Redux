import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import FormField from '../common/FormField';
import { login } from './service';

import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { authLoginFailure, authLoginRequest, authLoginSucces, uiResetError } from '../../store/actions'
import { getUi } from '../../store/selectors';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const handleChangeUsername = event => setUsername(event.target.value);
  const handleChangePassword = event => setPassword(event.target.value);
  const handleResetError = () => dispatch(uiResetError())

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(authLoginRequest());
    try {
      await login({ username, password });
      dispatch(authLoginSucces());
      const to = location.state?.from?.pathname || '/';

      // const to =
      //   (location.state &&
      //     location.state.from &&
      //     location.state.from.pathname) ||
      //   '/';

      navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };

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
