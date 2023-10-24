import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import route from './../routes/route.json'

export const privatePageHoc=(Component)=>{
    const NewComponent=(props)=>{
    const {isUserLogin} = useContext(AuthContext);

    return isUserLogin ? (
        <Component {...props}/>
    ) :(
        <Navigate to={`/${route.LOGIN}`}/>
    );
    };
   
    return NewComponent;

}