import { Nav, Container, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import route from "./../../routes/route.json";
import styles from "./AppHeader.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

const AppHeader = () => {
  const linkClasses = ({ isActive }) =>
    isActive ? styles.activeLink : styles.linkStyle;

  const { isDark, toggleTheme } = useContext(ThemeContext);
  // console.log("isDark", isDark);

  const { isUserLogin, logoutHandler } = useContext(AuthContext);

  const {userData : {username},
  } = useContext(UserContext);

  const themeClasses = isDark
    ? "bi bi-brightness-high-fill"
    : "bi bi-moon-fill";

  return (
    <header style={{ marginBottom: "10px" }}>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <NavLink className={linkClasses} to={route.HOME}>
              User Profiles
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink className={linkClasses} to={route.PROFILES}>
                Profile
              </NavLink>
            </Nav.Link>
            {isUserLogin && (
              <>
                <Nav.Link>
                  <NavLink className={linkClasses} to={route.ADD_USER}>
                    Add User
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className={linkClasses} to={route.SETTING}>
                    User Setting
                  </NavLink>
                </Nav.Link>
              </>
            )}
            <Nav.Link>
              <NavLink className={linkClasses} to={route.HELP}>
                Support
              </NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
            {isUserLogin && (
              <Button variant="light" onClick={logoutHandler}>
                Logout
              </Button>
            )}
            {!isUserLogin && (
              <NavLink to={route.LOGIN}>
                <Button variant="light">Login</Button>
              </NavLink>
            )}
          </Nav>
          <Nav>
            <Button onClick={toggleTheme}>
              <i className={`${themeClasses} text-white`}></i>
            </Button>
          </Nav>
           {isUserLogin && username && (
          <Nav>
            <Button>
              <i className="bi bi-person-fill text-white"></i>  
                  {username}
            </Button>
          </Nav>
        )} 
        </Container>
      </Navbar>
    </header>
  );
};
export default AppHeader;
