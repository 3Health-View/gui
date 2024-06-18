import { Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.scss";

function App() {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <div className="header">
        <h1 onClick={() => navigate("/")}>3Health View</h1>
        <div className="header-buttons">
          <Button variant="outline-light" onClick={() => navigate("/login")}>
            Log In
          </Button>
          <Button variant="outline-light" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
