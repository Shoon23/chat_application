import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { useQuery } from "@tanstack/react-query";
import { iUser } from "../common/model";
import { useRefreshToken } from "../common/hooks/useRefreshToken";

type Props = {};

const PersistLogin: React.FC<Props> = ({}) => {
  const data = queryClient.getQueryData<iUser>(["user"]);
  const isExist = data?.access_token !== "";

  const navigate = useNavigate();

  const { isLoading, isError } = useQuery(["user"], useRefreshToken, {
    enabled: isExist,
    refetchOnMount: false,
    retry: false,
  });
  if (isError) {
    navigate("/auth/login");
  }
  return isLoading ? <div className="">loading.....</div> : <Outlet />;
};

export default PersistLogin;
