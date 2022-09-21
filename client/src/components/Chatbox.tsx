import React from "react";
import ChatHeader from "./ChatHeader";

type Props = {};

const Chatbox: React.FC<Props> = ({}) => {
  return (
    <div className="w-2/3 border-r border-slate-700">
      <div className="">
        <ChatHeader />

        <div className="">toast</div>
      </div>
    </div>
  );
};

export default Chatbox;
