import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextConsumer = AuthContext.Consumer;

AuthContext.displayName = 'Auth';

export const AuthContextProvider = ({ isInitiallyLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  return (
    <AuthContext.Provider value={{ isLogged, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};

export default AuthContext;
