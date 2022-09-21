import React from "react";
import Avatar from "./Avatar";

type Props = {};

const Chats: React.FC<Props> = ({}) => {
  return (
    <div className="w-1/3 border-r border-slate-700">
      <div className="sticky top-0">
        <h1 className="font-bold text-2xl m-2">Chats</h1>
        <div className="form-control flex my-2 border-b border-slate-700 pb-4">
          <input
            type="text"
            className="input input-bordered input-md self-center w-11/12"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="h-screen overflow-auto">
        <div className="flex flex-col last:mb-10">
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default Chats;
