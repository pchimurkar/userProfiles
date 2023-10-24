import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./Profiles.module.css";
import { deleteUser, getUserData } from "../../services/user";
import Loader from "../Loader/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import route from "./../../routes/route.json";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import ModalPop from "../ModalPop/ModalPop";

// eslint-disable-next-line react/prop-types
const Profiles = ({ page = "1" }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  //const [page, setPage] = useState(1);

  const [searchUsers, setSearchUsers] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [deleteUserIndex,setDeleteuserIndex]=useState(null);

  const navigateHandler = () => {
    setSearchUsers("");
    navigate(page === "1" ? `/${route.PROFILES}/2` : `/${route.PROFILES}/1`);
  };

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getUserData(page)
      .then((profiles) => {
        setUsers(profiles.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [page]);

  //console.log(users);
  const deleteUserHandler = (userIndex) => {
    setShowDeleteModal(true);
    setDeleteuserIndex(userIndex);
   /*  let deleteConfirm = confirm(
      "Are you sure you want to permanently delete the profile?"
    );
    if (!deleteConfirm) {
      return;
    }

    let deleteUserLoading = [...users];
    deleteUserLoading[userIndex].isLoading = true;
    setUsers(deleteUserLoading);

    //console.log('need to call delete api',userIndex);
    deleteUser(users[userIndex].id)
      .then((isUserDelete) => {
        //console.log('API completed', isUserDelete);
        if (isUserDelete) {
          const profiles = [...users];
          profiles.splice(userIndex, 1);
          setUsers(profiles);
        }
      })
      .catch(() => {
        let deleteUserError = [...users];
        deleteUserError[userIndex].isLoading = false;
        deleteUserError[userIndex].isError = true;
        setUsers(deleteUserError);
      }); */
  };
  const closeDeleteModalHandler = ()=>{
setShowDeleteModal(false);
setDeleteuserIndex(null);
  }

  const userDeleteHandler =()=>{
    
    let deleteUserLoading = [...users];
    deleteUserLoading[deleteUserIndex].isLoading = true;
    setUsers(deleteUserLoading);


    deleteUser(users[deleteUserIndex].id).then((isUserDelete) => {
      if (isUserDelete) {
        const profiles = [...users];
        profiles.splice(deleteUserIndex, 1);
        setUsers(profiles);
      }
    })
    .catch((isUserDelete) => {
      if(isUserDelete){
        let deleteUserError = [...users];
        deleteUserError[deleteUserIndex].isLoading = false;
        deleteUserError[deleteUserIndex].isError = true;
        setUsers(deleteUserError);
      }  
    });
    closeDeleteModalHandler();
  }

  const handleSearchInputChange = (e) => {
    setSearchUsers(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase())
  );

  const userCards = (searchUsers ? filteredUsers : users).map(
    (user, index) => (
      <UserCard
        key={index}
        fname={user.first_name}
        email={user.email}
        image={user.avatar}
        userIndex={index}
        isLoading={user.isLoading}
        isError={user.isError}
        deleteUserHandler={deleteUserHandler}
      />
    )
  );

  return (
    <>
      <input
        type="text"
        value={searchUsers}
        onChange={handleSearchInputChange}
        placeholder="Search by name or email"
        className={styles.inputBox}
      />
      <p>Page : {page}</p>
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          {isError && (
            <p className={styles.errorText}>
              Something goes wrong,please try letter
            </p>
          )}

          {!isError && (
            <div className={styles.profileContainer}>{userCards}</div>
          )}

          <Button varient='primary' onClick={navigateHandler}>
            Page {page === "1" ? "2" : "1"}
          </Button>
        </>
      )}
      <ModalPop 
        isShow={showDeleteModal}
        closeHandler={closeDeleteModalHandler}
        saveHandler={userDeleteHandler}
        modalTitle="Please re-confirm"
        modalBody="do you want to delete this user ?"
        btnActionLabel="Delete"
        btnActionVariant="danger"


      />
      {!(page === '1' || page === '2')&& <Navigate to='/error'/>}
    </>
  );
};
Profiles.propTypes ={
  page:PropTypes.string,
};
export default Profiles;
