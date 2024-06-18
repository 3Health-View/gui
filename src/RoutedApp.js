import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import AccountForm from "./Components/AccountForm";

const RoutedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<AccountForm isLogin={true} />} />
        <Route path="signup" element={<AccountForm />} />
      </Route>
    </Routes>
  );
};

export default RoutedApp;
