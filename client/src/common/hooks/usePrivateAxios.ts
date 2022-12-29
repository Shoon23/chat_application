import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { QueryClient } from "@tanstack/react-query";
import { iUser } from "../../common/model";
import { useRefreshToken } from "../../common/hooks/useRefreshToken";

export const usePrivateAxios = (queryClient: QueryClient) => {
  const user = queryClient.getQueryData<iUser>(["user"]);

  const privateAxios = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    withCredentials: true,
  });
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  const onRequest = async (req: AxiosRequestConfig) => {
    if (!user) return req;
    const decoded = jwt_decode<JwtPayload>(user?.access_token);
    const { exp } = decoded;
    const token_expiration = new Date(1000 * exp).toLocaleString();
    const current_time = new Date().toLocaleString();

    if (current_time > token_expiration) {
      const user = await useRefreshToken();
      queryClient.setQueryData(["user"], user);
      req.headers!.Authorization = `Bearer ${user?.access_token}`;
    }

    return req;
  };
  privateAxios.interceptors.request.use(onRequest, onRequestError);

  return privateAxios;
};
