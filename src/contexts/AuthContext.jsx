import { createContext, useEffect, useState } from "react";
import{SS_IS_USER_LOGIN} from '../constants/index'
export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(
    sessionStorage.getItem(SS_IS_USER_LOGIN) === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem(SS_IS_USER_LOGIN, isUserLogin);
  }, [isUserLogin]);

  const loginHandler = () => setIsUserLogin(true);
  const logoutHandler = () => setIsUserLogin(false);
  return (
    <AuthContext.Provider value={{ isUserLogin, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
