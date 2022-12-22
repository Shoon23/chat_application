import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PrivateRoutes from "./middleware/PrivateRoutes";
import PersistLogin from "./middleware/PersistLogin";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import {
  fetch_instance,
  check_token,
  onRequestError,
} from "./services/custom-axios-fetch";

export const cqueryClient = new QueryClient();

fetch_instance.interceptors.request.use((config: AxiosRequestConfig) => {
  check_token(config);

  return config;
}, onRequestError);

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={cqueryClient}>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
