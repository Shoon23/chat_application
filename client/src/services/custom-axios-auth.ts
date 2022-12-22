import axios, { AxiosError, AxiosRequestConfig } from "axios";

const auth_instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default auth_instance;
