import { Button, Col, Row } from "react-bootstrap";
import { backgroundHoc } from "../../hoc/backgroundHoc";
import { useContext, useState } from "react";
import Loader from "../Loader/Loader";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import route from "./../../routes/route.json";
import { UserContext } from "../../contexts/UserContext";
import {
  USER_LOGIN_ERROR_MSG,
  USER_LOGIN_VALIDATION_MSG,
} from "../../constants";
// eslint-disable-next-line react-refresh/only-export-components
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const { loginHandler: contextLoginHandler } = useContext(AuthContext);
  const { setUserDataHandler } = useContext(UserContext);

  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };

  const loginHandler = () => {
    //generic validation
    // console.log('login')
    if (!(username && password && username.length > 3 && password.length > 3)) {
      showError(USER_LOGIN_ERROR_MSG);
      return;
    }
    setIsLoading(true);
    //call the api,fake login logic
    setTimeout(() => {
      setIsLoading(false);
      if (username === password) {
        contextLoginHandler();
        setUserDataHandler({ username });
        navigate(route.HOME);
        // console.log('user login suceessful');
      } else {
        showError(USER_LOGIN_VALIDATION_MSG);
      }
    }, 1500);
  };
  const resetHandler = () => {
    setUsername("");
    setPassword("");
    setErrorMsg("");
  };

  return (
    <div className="m-3">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Row className="mt-3 md-3">
            <Col>
              <label htmlFor="username">UserName</label>
            </Col>
            <Col>
              <input
                type="text"
                id="username"
                placeholder="UserName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3 md-3">
            <Col>
              <label htmlFor="password">PassWord</label>
            </Col>
            <Col>
              <input
                type="password"
                id="pwd"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3 md-3">
            <Col>
              <Button variant="primary" onClick={loginHandler}>
                Login
              </Button>
            </Col>
            <Col>
              <Button variant="link" onClick={resetHandler}>
                Reset
              </Button>
            </Col>
          </Row>
          {errorMsg && (
            <Row className="mt-3 md-3">
              <p className="text-danger fw-bold">{errorMsg}</p>
            </Row>
          )}
        </>
      )}
    </div>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export default backgroundHoc(LoginForm);
