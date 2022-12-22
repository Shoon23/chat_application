import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { iLoginForm } from "../interfaces/iLoginForm";
import { iErrorMsg } from "../interfaces/iErrorMsg";
import { useNavigate, useLocation } from "react-router-dom";

import auth_instance from "../../../services/custom-axios-auth";
import { cqueryClient } from "../../../App";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return useMutation({
    mutationFn: async (formData: iLoginForm) => {
      return await auth_instance.post("auth/login", formData);
    },
    onError(error: AxiosError<iErrorMsg>) {
      return error;
    },
    onSuccess(data: AxiosResponse, variables, context) {
      cqueryClient.setQueryData(["user"], data?.data);
      navigate(from, { replace: true });
      return data;
    },
  });
};
