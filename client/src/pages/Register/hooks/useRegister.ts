import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { iErrorMsg } from "../../Login/interfaces/iErrorMsg";
import { iPostData } from "../interfaces/iPostData";
import { iUserDetails } from "../interfaces/iUserDetails";
import auth_instance from "../../../services/custom-axios-auth";
import { cqueryClient } from "../../../App";

export const useRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return useMutation({
    mutationFn: async (formData: iPostData) => {
      return await auth_instance.post<iUserDetails>("auth/register", formData);
    },
    onError(error: AxiosError<iErrorMsg>) {
      return error;
    },
    onSuccess(data: AxiosResponse) {
      cqueryClient.setQueryData(["user"], data?.data);
      navigate(from, { replace: true });
      return data;
    },
  });
};
