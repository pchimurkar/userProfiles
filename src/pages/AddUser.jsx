/* eslint-disable react-refresh/only-export-components */
// import { Navigate } from "react-router-dom";
import UserForm from "../components/UserForm/UserForm";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import route from './../routes/route.json';
import { privatePageHoc } from "../hoc/privatePageHoc";

const AddUser = () => {

  // const {isUserLogin}= useContext(AuthContext);
  return (
    <>
    {/* {isUserLogin && ( */}
      
      <h1> Add Users</h1>
        <UserForm>
          <p>I am  comming from AddUser page !!!</p>
        </UserForm>
      
    {/* )}  */}
    {/* {!isUserLogin && <Navigate to={`/${route.LOGIN}`} />} */}
    </>
     
  );
};
export default privatePageHoc(AddUser);
