import { createContext, useEffect, useState } from "react";
import {LS_IS_DARK_THEME} from '../constants/index'

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({children}) =>{
    const [isDark ,setIsDark] = useState(localStorage.getItem(LS_IS_DARK_THEME ) ==='true');

    useEffect(()=>{
        localStorage.setItem(LS_IS_DARK_THEME,isDark);
    },[isDark]);

    const toggleTheme = ()=>{
        setIsDark(!isDark);
    }

return (
    <ThemeContext.Provider value={{isDark,toggleTheme}}>
        {children}
        {isDark && (
          <style>
            {`body{
              background-color:black;
              color:white;
            }`}
          </style>
        )}
    </ThemeContext.Provider>
)
}
export default ThemeProvider;