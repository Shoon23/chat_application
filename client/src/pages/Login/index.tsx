import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { iLoginForm } from "./interfaces/iLoginForm";
import { useLogin } from "./hooks/useLogin";
import { cqueryClient } from "../../App";

const Login: React.FC = () => {
  const mutation = useLogin();

  const onLogin = (data: iLoginForm) => {
    mutation.mutateAsync(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginForm>();

  return (
    <div className="grid h-screen place-items-center">
      <div className="card w-96 bg-neutral text-primary-content shadow-2xl">
        <div className="card-body">
          <p className="text-center text-2xl m-2">Login</p>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit((data) => onLogin(data))}
          >
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-accent w-full max-w-xs"
              {...register("email", { required: "Email is required" })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-accent w-full max-w-xs"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password should be at least 8 characters",
                },
              })}
            />
            {mutation.error?.response?.data ? (
              <p className="text-red-500">
                {mutation.error?.response?.data.err}
              </p>
            ) : (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
            <button className="btn btn-accent w-full max-w-xs">Login</button>
            <Link to="/auth/register" className="self-center text-slate-400">
              Signup
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
