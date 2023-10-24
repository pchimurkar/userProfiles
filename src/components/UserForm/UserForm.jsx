import { useRef, useState } from "react";
import styles from "./UserForm.module.css";
import { addUser } from "../../services/user";
import Loader from "../Loader/Loader";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import route from "./../../routes/route.json";
import { backgroundHoc } from "../../hoc/backgroundHoc";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const UserForm = ({ children }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const fnameRef = useRef(); //it will return an object which has property current.
  const lnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();

  const reRenderCount = useRef(0);
  const navigate = useNavigate();

  const resetField = () => {
    setFname("");
    setLname("");
    setEmail("");
    setMobile("");
    setIsLoader(false);
    setSuccessMsg("");
    setErrorMsg("");
  };
  const showSuceessMsg = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      resetField();
      setSuccessMsg("");
      navigate(route.HOME);
    }, 6000);
  };

  const showErrorMsg = (msg) => {
    setIsLoader(false);
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 6000);
  };
  //specific validation
  const isFormValid = () => {
    const regExEmail = /^\S+@\S+\.\S+$/;
    const regExName = /^[A-Za-z]+$/;

    const validations = [
      {
        isValid: !fname,
        errorMsg: "please enter first name",
        inputRef: fnameRef,
      },
      {
        isValid: fname.length < 3,
        errorMsg: "please enter fisrt name at least 3 charcters in it",
        inputRef: fnameRef,
      },
      {
        isValid: !regExName.test(fname),
        errorMsg: "please enter charcters only in first name.",
        inputRef: fnameRef,
      },
      {
        isValid: !lname,
        errorMsg: "please enter last name",
        inputRef: lnameRef,
      },
      {
        isValid: lname.length < 3,
        errorMsg: "please enter last name",
        inputRef: lnameRef,
      },
      {
        isValid: !regExName.test(lname),
        errorMsg: "please enter last name at least 6 charcters in it",
        inputRef: lnameRef,
      },
      {
        isValid: !email,
        errorMsg: "please enter email id ",
        inputRef: emailRef,
      },
      {
        isValid: !regExEmail.test(email),
        errorMsg: "please enter valid email id",
        inputRef: emailRef,
      },
      {
        isValid: !mobile,
        errorMsg: "please enter  mobile number",
        inputRef: mobileRef,
      },
      {
        isValid: mobile.length !== 10,
        errorMsg: "please enter valid mobile number",
        inputRef: mobileRef,
      },
    ];
    for (const validation of validations) {
      if (validation.isValid) {
        showErrorMsg(validation.errorMsg);
        validation.inputRef.current.focus();
        return false;
      }
    }

    /* if (!fname) {
      showErrorMsg("please enter charcters only");
      return false;
    } else if (fname.length < 3) {
      showErrorMsg("please enter fisrt name at least 3 charcters in it");
      return false;
    }else if(!regExName.test(fname)){
        showErrorMsg('please enter charcters only in first name.');
    } else if (!lname) {
      showErrorMsg("please enter last name");
      return false;
    } else if (lname.length < 3) {
      showErrorMsg("please enter last name at least 6 charcters in it");
      return false;
    }else if(!regExName.test(lname)){
      showErrorMsg('please enter charcters only in last name .');
  }else if (!email) {
      showErrorMsg("please enter email");
      return false;
    } else if (!regExEmail.test(email)) {
      showErrorMsg("please enter valid email");
      return false;
    } else if (!mobile) {
      showErrorMsg("please enter mobile number");
      return false;
    } else if (mobile.length !== 10) {
      showErrorMsg("please enter valid mobile number");
      return false;
    }*/
    return true;
  };

  const createUserHandler = () => {
    // if(!(fname && lname && email && mobile)){
    //     showErrorMsg('All fields required');
    //     return;
    // }

    // console.log(fnameRef.current.focus());
    //fnameRef.current.focus();

    if (!isFormValid()) {
      return;
    }

    const user = {
      fname,
      lname,
      email,
      mobile,
    };
    setIsLoader(true);
    //api call
    addUser(user)
      .then((data) => {
        //console.log(data);
        if (data.id) {
          showSuceessMsg(
            ` User has been created successfully with id  ${data.id}`
          );
        }
      })
      .catch(() => {
        showErrorMsg("Error : Please try again after sometime !!!");
      });
  };

  return (
    <div>
      {children}
      <Row className="mt-3 md-3">
        <label htmlFor="fname">First Name : </label>
        <Col>
          <input
            type="text"
            id="fname"
            value={fname}
            ref={fnameRef}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Enter First Name"
          />
        </Col>
      </Row>
      <Row className="mt-3 md-3">
        <label htmlFor="lname">Last Name : </label>
        <Col>
          <input
            // className={styles.inputField}
            type="text"
            id="lname"
            value={lname}
            ref={lnameRef}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Enter Last Name"
          />
        </Col>
      </Row>
      <Row className="mt-3 md-3">
        <label htmlFor="email">Email Id : </label>
        <Col>
          <input
            // className={styles.inputField}
            type="email"
            id="email"
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Id "
          />
        </Col>
      </Row>

      <Row className="mt-3 md-3">
        <label htmlFor="mobile">Mobile : </label>
        <Col>
          <input
            // className={styles.inputField}
            type="number"
            id="mobile"
            value={mobile}
            ref={mobileRef}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
          />
        </Col>
      </Row>
      <Row className="mt-3 md-3" >
        <Col>
          <Button
            variant="primary"
            onClick={createUserHandler}
            disabled={isLoader}
          >
            Create User
          </Button>
        </Col>
        <Col>
          <Button variant="link" onClick={resetField}>
            Reset form
          </Button>
        </Col>
      </Row>
      {isLoader && <Loader />}
      <p>Re-render count : {++reRenderCount.current}</p>
      <p className={styles.successText}>{successMsg}</p>
      <p className={styles.errorText}>{errorMsg}</p>
    </div>
  );
};
UserForm.propTypes = {
  children: PropTypes.any,
};
// eslint-disable-next-line react-refresh/only-export-components
export default backgroundHoc(UserForm);
