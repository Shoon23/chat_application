import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ReceiveBox from "./ReceiveBox";
import SendBox from "./SendBox";
import ChatBox from "./ChatBox";

type Props = {};

const Chatbox: React.FC<Props> = ({}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({});
  }, []);

  return (
    <div className="flex flex-col w-2/3 border-r border-slate-700">
      <ChatHeader />
      <div className="h-screen overflow-y-scroll">
        <div className="flex flex-col">
          <ReceiveBox />
          <SendBox />
          <ReceiveBox />
          <SendBox />
          <ReceiveBox />
          <SendBox />
          <ReceiveBox />
          <SendBox />
          <ReceiveBox />
          <SendBox />
          <ReceiveBox />
          <SendBox />
          <div ref={bottomRef}></div>
        </div>
      </div>
      <ChatBox />
    </div>
  );
};

export default Chatbox;
