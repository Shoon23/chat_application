import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { queryClient } from "../../main";
import { iUser } from "../../common/model";
import { useRefreshToken } from "../../common/hooks/useRefreshToken";

export const privateAxios = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export const onRequest = async (req: AxiosRequestConfig) => {
  const data = queryClient.getQueryData<iUser>(["user"]);
  if (!data) return req;
  const decoded = jwt_decode<JwtPayload>(data?.access_token);
  const { exp } = decoded;
  const token_expiration = new Date(1000 * exp).toLocaleString();
  const current_time = new Date().toLocaleString();

  if (current_time > token_expiration) {
    const data = await useRefreshToken();
    queryClient.setQueryData(["user"], data);
    req.headers!.Authorization = `Bearer ${data?.access_token}`;
  }

  return req;
};
