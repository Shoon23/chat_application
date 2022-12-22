import axios, { AxiosError, AxiosRequestConfig } from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { iUser } from "../middleware/interface/iUser";
import { cqueryClient } from "../App";
import { useRefreshToken } from "../middleware/hooks/useRefreshToken";

export const fetch_instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const check_token = async (config: AxiosRequestConfig) => {
  const data = cqueryClient.getQueryData<iUser>(["user"]);
  if (!data) return;
  const decoded = jwt_decode<JwtPayload>(data?.access_token);
  const { exp } = decoded;
  const token_expiration = new Date(1000 * exp).toLocaleString();
  const current_time = new Date().toLocaleString();

  if (current_time > token_expiration) {
    const data = await useRefreshToken();

    cqueryClient.setQueryData(["user"], data);
    config.headers!.Authorization = `Bearer ${data?.access_token}`;
  }
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
