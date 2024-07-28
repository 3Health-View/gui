import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import "./Styles/AccountForm.scss";
import { login, signup } from "../API/api";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";

const AccountForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [sigupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const [isInvalidSU, setIsInvalidSU] = useState({
    email: false,
    password: false,
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
      try {
        const { token } = await signup(sigupInfo);
        window.sessionStorage.setItem("token", token);
        navigate("/");
      } catch (err) {
        if (err.response) {
          if (err.response.status >= 400) {
            setIsInvalidSU({ email: true, password: true });
            handleClear();
          }
        }
      }
    }
  };

  const handleLogin = async () => {
    if (loginInfo.email && loginInfo.password) {
      try {
        const { token } = await login(loginInfo);
        window.sessionStorage.setItem("token", token);
        navigate("/");
      } catch (err) {
        if (err.response) {
          if (err.response.status >= 400) {
            setIsInvalidLogin(true);
          }
        }
      }
    }
  };

  useEffect(handleClear, [isLogin]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(sigupInfo.email);
    setIsInvalidSU((prev) => ({
      ...prev,
      email: !validEmail,
    }));
  }, [sigupInfo.email]);

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
              isInvalid={isInvalidLogin}
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
              isInvalid={isInvalidLogin}
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
              isInvalid={isInvalidSU.email}
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
              isInvalid={isInvalidSU.password}
            />
            <PasswordStrengthBar
              password={sigupInfo.password}
              onChangeScore={(score, feedback) => {
                if (score < 2) {
                  setIsInvalidSU((prev) => ({ ...prev, password: true }));
                } else {
                  setIsInvalidSU((prev) => ({ ...prev, password: false }));
                }
              }}
            />
          </div>
          <Button
            className="action-button"
            onClick={handleSignUp}
            disabled={isInvalidSU.email || isInvalidSU.password}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AccountForm;
