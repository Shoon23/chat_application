import React from "react";
import { Link } from "react-router-dom";
import { iRegisterForm } from "./model";
import { useForm } from "react-hook-form";
import authentication from "../../services/authentication";
import { useQueryClient } from "@tanstack/react-query";

const Register: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = authentication.register(queryClient);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<iRegisterForm>();

  const onRegister = (data: iRegisterForm) => {
    const { confirm_password, ...others } = data;
    mutation.mutate(others);
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="card w-96 bg-neutral text-primary-content shadow-2xl">
        <div className="card-body">
          <p className="text-center text-2xl m-2">Create Account</p>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit((data) => onRegister(data))}
          >
            <input
              type="text"
              placeholder="First name"
              className="input input-bordered input-accent w-full max-w-xs"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            <p className="text-red-500 ">{errors.first_name?.message}</p>
            <input
              type="text"
              placeholder="Last name"
              className="input input-bordered input-accent w-full max-w-xs"
              {...register("last_name", { required: "Last name is required" })}
            />
            <p className="text-red-500">{errors.last_name?.message}</p>

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
                required: "Passwrod is missing",
                minLength: {
                  value: 4,
                  message: "Password should be at least 8 characters",
                },
              })}
            />
            <p className="text-red-500">{errors.password?.message}</p>

            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered input-accent w-full max-w-xs"
              {...register("confirm_password", {
                required: "Password is missing",
                validate: {
                  passwordEqual: (value) =>
                    value === getValues().password || "Password not matched",
                },
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
              <p className="text-red-500">{errors.confirm_password?.message}</p>
            )}

            <button className="btn btn-accent w-full max-w-xs">Register</button>
            <Link to="/auth/login" className="self-center text-slate-400">
              Signin
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
