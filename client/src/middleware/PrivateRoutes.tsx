import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { cqueryClient } from "../App";
import { iUser } from "./interface/iUser";

type Props = {};

const PrivateRoutes: React.FC<Props> = ({}) => {
  const location = useLocation();
  const data = cqueryClient.getQueryData<iUser>(["user"]);

  return data?.access_token ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
