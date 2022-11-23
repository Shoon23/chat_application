import React from "react";
import { Outlet, Navigate } from "react-router-dom";

type Props = {};

const PrivateRoutes: React.FC<Props> = ({}) => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
