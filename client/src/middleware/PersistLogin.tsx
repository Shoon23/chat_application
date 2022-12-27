import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { cqueryClient } from "../App";
import { useQuery } from "@tanstack/react-query";
import { iUser } from "./interface/iUser";
import { useRefreshToken } from "./hooks/useRefreshToken";

type Props = {};

const PersistLogin: React.FC<Props> = ({}) => {
  const data = cqueryClient.getQueryData<iUser>(["user"]);
  const isExist = data?.access_token !== "";

  const navigate = useNavigate();

  const { isLoading, isError } = useQuery(["user"], useRefreshToken, {
    enabled: isExist,
  });
  if (isError) {
    navigate("/auth/login");
  }
  return isLoading ? <div className="">loading.....</div> : <Outlet />;
};

export default PersistLogin;
