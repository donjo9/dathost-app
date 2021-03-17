import * as React from 'react';

import {MMKV} from 'react-native-mmkv';
type AuthContext = {
  username: string;
  password: string;
  login: (user: string, pw: string) => void;
  logout: () => void;
};

const authContext = React.createContext<AuthContext>({
  username: '',
  password: '',
  login: () => {},
  logout: () => {},
});
const useAuth = () => React.useContext(authContext);

const AuthProvider: React.FC = ({children}) => {
  const [username, setuser] = React.useState(
    () => MMKV.getString('DATHOST_USER') || '',
  );

  const [password, setPassword] = React.useState(
    () => MMKV.getString('DATHOST_PASSWORD') || '',
  );

  React.useEffect(() => {
    MMKV.set('DATHOST_USER', username || '');
    MMKV.set('DATHOST_PASSWORD', password || '');
  }, [username, password]);

  const login = (user: string, pw: string) => {
    setuser(user);
    setPassword(pw);
  };

  const logout = () => {
    setuser(() => '');
    setPassword(() => '');
  };

  return (
    <authContext.Provider value={{username, password, login, logout}}>
      {children}
    </authContext.Provider>
  );
};

export {AuthProvider, useAuth};
