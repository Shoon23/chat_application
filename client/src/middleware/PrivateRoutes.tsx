import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { queryClient } from "../main";
import { iUser } from "../common/model";

type Props = {};

const PrivateRoutes: React.FC<Props> = ({}) => {
  const location = useLocation();
  const data = queryClient.getQueryData<iUser>(["user"]);

  return data?.access_token ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
