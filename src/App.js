import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.scss";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [window.sessionStorage.getItem("token")]);

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className="main-container">
      <div className="header">
        <h1 onClick={() => navigate("/")}>3Health View</h1>
        <div className="header-buttons">
          {!isLoggedIn ? (
            <>
              <Button
                variant="outline-light"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
              <Button
                variant="outline-light"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button variant="outline-light" onClick={handleLogout}>
              Log Out
            </Button>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
