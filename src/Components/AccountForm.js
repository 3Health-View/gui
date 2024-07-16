import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import "./Styles/AccountForm.scss";
import { login, signup } from "../API/api";
import { useNavigate } from "react-router-dom";

const AccountForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [sigupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleClear = () => {
    setLoginInfo({ email: "", password: "" });
    setSignupInfo({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleSignUp = async () => {
    if (
      sigupInfo.email &&
      sigupInfo.firstName &&
      sigupInfo.lastName &&
      sigupInfo.password
    ) {
      const { token } = await signup(sigupInfo);
      window.sessionStorage.setItem("token", token);
      navigate("/");
    }
  };

  const handleLogin = async () => {
    if (loginInfo.email && loginInfo.password) {
      const { token } = await login(loginInfo);
      window.sessionStorage.setItem("token", token);
      navigate("/");
    }
  };

  useEffect(handleClear, [isLogin]);

  return (
    <div className="account-container">
      {isLogin ? (
        <Form className="account-form">
          <h3 className="account-text-heading">Log In</h3>
          <div>
            <FormLabel>Email</FormLabel>
            <FormControl
              value={loginInfo.email}
              onChange={(event) =>
                setLoginInfo((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </div>
          <div>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={loginInfo.password}
              onChange={(event) =>
                setLoginInfo((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
          </div>
          <Button className="action-button" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      ) : (
        <Form className="account-form">
          <h3 className="account-text-heading">Sign Up</h3>
          <div>
            <FormLabel>First Name</FormLabel>
            <FormControl
              value={sigupInfo.firstName}
              onChange={(event) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  firstName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <FormLabel>Last Name</FormLabel>
            <FormControl
              value={sigupInfo.lastName}
              onChange={(event) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  lastName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              value={sigupInfo.email}
              onChange={(event) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={sigupInfo.password}
              onChange={(event) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
          </div>
          <Button className="action-button" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AccountForm;
