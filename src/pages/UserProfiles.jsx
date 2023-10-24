import { useParams } from "react-router-dom";
import Profiles from "../components/Profiles/Profiles";

const UserProfiles = () => {

const {page = '1'} = useParams();


  return (
    <div>
    <h2 style={{margin:'20px'}}>User Profiles</h2>
      <Profiles page={page}/>
    </div>
  );
};
export default UserProfiles;