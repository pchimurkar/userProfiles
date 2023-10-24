/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { backgroundHoc } from "../../hoc/backgroundHoc";
import Loader from "../Loader/Loader";
import styles from "./UserCard.module.css";
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "./../../contexts/AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
const UserCard = ({
  fname = 'NA',
  email = 'NA',
  image,
  userIndex,
  isLoading,
  isError,
  deleteUserHandler,
}) => {

  const {isUserLogin} = useContext(AuthContext);

  return (
    <>
      <h4>{fname}</h4>
      <p>{email}</p>
      <div>
        <img src={image} alt="user-card" width="200px" height="200px" />
      </div>
      {isUserLogin && (

      <div className={styles.deleteBtn}>
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            {isError && (
              <p className={styles.errorText}>
                Error occurred during the delete operation. Please try again
                later.
              </p>
            )}

            {!isError && (
              <Button
                variant="outline-danger"
                onClick={() => deleteUserHandler(userIndex)}
                disabled={isLoading}
              >
                Delete
              </Button>
            )}

            {/* {isError && (
      <p className={styles.errorText}>
        Error occurred during the delete operation. Please try again later.
      </p>
    )} */}
          </>
        )}
      </div>
      )}
    </>
  );
};
UserCard.propTypes = {
  fname :PropTypes.string,
  email :PropTypes.string,
  image :PropTypes.string,
  userIndex :PropTypes.number.isRequired,
  deleteUserHandler :PropTypes.func.isRequired,
};
  
// eslint-disable-next-line react-refresh/only-export-components
export default backgroundHoc(UserCard, "hsl(322, 43%, 65%)");
