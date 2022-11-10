import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Register: React.FC<Props> = ({}) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="card w-96 bg-neutral text-primary-content shadow-2xl">
        <div className="card-body">
          <p className="text-center text-2xl m-2">Create Account</p>
          <form className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="First name"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Last name"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered input-accent w-full max-w-xs"
            />
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
