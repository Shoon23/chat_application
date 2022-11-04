import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

type Props = {};

const AuthPage: React.FC<Props> = ({}) => {
  return (
    <div className="">
      <Login />
      <Register />
    </div>
  );
};

export default AuthPage;
