import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { iLoginForm } from "../interfaces/iLoginForm";
import { iErrorMsg } from "../interfaces/iErrorMsg";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: iLoginForm) => {
      return await axios.post("http://localhost:3000/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onError(error: AxiosError<iErrorMsg>) {
      return error;
    },
    onSuccess(data: AxiosResponse, variables, context) {
      queryClient.setQueryData(["user"], data.data);
      navigate("/home");
    },
  });
};
