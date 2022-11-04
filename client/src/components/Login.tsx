import React from "react";

type Props = {};

const Login: React.FC<Props> = ({}) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="card w-96 bg-neutral text-primary-content shadow-2xl">
        <div className="card-body">
          <p className="text-center text-2xl m-2">Login</p>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-accent w-full max-w-xs mb-5"
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-accent w-full max-w-xs mb-5"
            />
            <button className="btn btn-accent w-full max-w-xs">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
