import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { iPostData } from "../interfaces/iPostData";
import { iUserDetails } from "../interfaces/iUserDetails";

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: iPostData) => {
      return await axios.post<iUserDetails>(
        "http://localhost:3000/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    },
    onError(error: AxiosError) {
      console.log(error);
      return error;
    },
    onSuccess(data: AxiosResponse) {
      queryClient.setQueryData(["user"], data.data);
      navigate("/home");
    },
  });
};
