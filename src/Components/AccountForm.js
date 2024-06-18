import React from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import "./Styles/AccountForm.scss";

const AccountForm = ({ isLogin }) => {
  return (
    <div className="account-container">
      {isLogin ? (
        <Form className="account-form">
          <h3 className="account-text-heading">Log In</h3>
          <FormLabel>Username</FormLabel>
          <FormControl />
          <FormLabel>Password</FormLabel>
          <FormControl type="password" />
          <Button className="action-button">Login</Button>
        </Form>
      ) : (
        <Form className="account-form">
          <h3 className="account-text-heading">Sign Up</h3>
          <FormLabel>Email</FormLabel>
          <FormControl type="email" />
          <FormLabel>Username</FormLabel>
          <FormControl />
          <FormLabel>Password</FormLabel>
          <FormControl type="password" />
          <Button className="action-button">Sign Up</Button>
        </Form>
      )}
    </div>
  );
};

export default AccountForm;
