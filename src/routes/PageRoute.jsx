import { Routes ,Route} from "react-router-dom";
import Home from "../pages/Home";
import AddUser from "../pages/AddUser";
import Error from "../pages/Error";
import route from './route.json'
import MasterLayout from "../layouts/MasterLayout";
import UserProfiles from "../pages/UserProfiles";
import Help from "../pages/Help";
import Setting from "../pages/Setting";
import Login from "../pages/Login";

const PageRoute = ()=>{
    return (
            
       <Routes>
            <Route path={route.HOME} element={<MasterLayout/>}>
            <Route index element={<Home/>}/>
            <Route path={route.PROFILES}>
            <Route index element={<UserProfiles/>}/>
            <Route path=":page" element={<UserProfiles/>}/>
            </Route>
            <Route path={route.ADD_USER} element={<AddUser/>} />
            <Route path={route.HELP} element={<Help/>} />
            <Route path={route.SETTING} element={<Setting/>} />
            <Route path={route.LOGIN} element={<Login/>} />
            </Route>
            <Route path="*" element={<Error/>} />
            
       </Routes>
    )
}
export default PageRoute;