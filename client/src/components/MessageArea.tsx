import React from "react";
import ChatHeader from "./ChatHeader";
import ReceiveBox from "./ReceiveBox";
import SendBox from "./SendBox";

type Props = {};

const Chatbox: React.FC<Props> = ({}) => {
  return (
    <div className="w-2/3 h-screen border-r border-slate-700">
      <ChatHeader />
      <div className="h-screen overflow-auto">
        <div className="flex flex-col gap-4">
          <ReceiveBox />
          <SendBox />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
