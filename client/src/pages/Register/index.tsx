import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { iRegisterForms } from "../../interface/iRegisterForm";
import axios from "axios";
type Props = {};

const Register: React.FC<Props> = ({}) => {
  const [formData, setFormData] = useState<iRegisterForms>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const mutation = useMutation({
    mutationFn: async (formData: iRegisterForms) => {
      return await axios.post("http://localhost:3000/auth/register", formData);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="card w-96 bg-neutral text-primary-content shadow-2xl">
        <div className="card-body">
          <p className="text-center text-2xl m-2">Create Account</p>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First name"
              className="input input-bordered input-accent w-full max-w-xs"
              name="first_name"
              onChange={handleChange}
              value={formData?.first_name}
            />
            <input
              type="text"
              placeholder="Last name"
              className="input input-bordered input-accent w-full max-w-xs"
              name="last_name"
              onChange={handleChange}
              value={formData?.last_name}
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-accent w-full max-w-xs"
              name="email"
              onChange={handleChange}
              value={formData?.email}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-accent w-full max-w-xs"
              name="password"
              onChange={handleChange}
              value={formData?.password}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered input-accent w-full max-w-xs"
              name="confirm_password"
              onChange={handleChange}
              value={formData?.confirm_password}
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
