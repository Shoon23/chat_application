import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, QueryClient } from "@tanstack/react-query";
import authAxios from "../lib/custom-axios/authAxios";
import { AxiosError, AxiosResponse } from "axios";
import { iLoginForm } from "../pages/Login/model";
import { iPostData } from "../pages/Register/model";
import { iError } from "../common/model";

export default {
  login: (queryClient: QueryClient) => {
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    return useMutation({
      mutationFn: async (formData: iLoginForm) => {
        return await authAxios.post("auth/login", formData);
      },
      onError(error: AxiosError<iError>) {
        return error;
      },
      onSuccess(data: AxiosResponse) {
        queryClient.setQueryData(["user"], data?.data);
        navigate(from, { replace: true });
      },
    });
  },
  register: (queryClient: QueryClient) => {
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    return useMutation({
      mutationFn: async (formData: iPostData) => {
        return await authAxios.post("auth/register", formData);
      },
      onError(error: AxiosError<iError>) {
        return error;
      },
      onSuccess(data: AxiosResponse) {
        queryClient.setQueryData(["user"], data?.data);
        navigate(from, { replace: true });
        return data;
      },
    });
  },
  logout: (queryClient: QueryClient) => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: async () => {
        return await authAxios.get("/auth/logout");
      },
      onSuccess(data, variables, context) {
        queryClient.clear();
        navigate("auth/login");
      },
    });
  },
};
