import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import PageRoute from "./routes/PageRoute";
import ThemeProvider from "./contexts/ThemeContext";
import AuthProvider from "./contexts/AuthContext";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <PageRoute />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
