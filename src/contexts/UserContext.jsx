import { createContext, useEffect, useState } from "react";
import {SS_USER_DATA} from '../constants/index'

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const sessionUserData = JSON.parse(sessionStorage.getItem(SS_USER_DATA)) || {};
  const [userData, setUserData] = useState(sessionUserData);

  const setUserDataHandler = (data) =>setUserData(data);

    useEffect(()=>{
        sessionStorage.setItem(SS_USER_DATA,JSON.stringify(userData));
    },[userData]);

  return (
    <UserContext.Provider value={{ userData, setUserDataHandler }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
