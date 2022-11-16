import React, { FormEvent, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ReceiveBox from "./ReceiveBox";
import SendBox from "./SenderBox";
import ChatBox from "./ChatBox";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

type Props = {};

const Chatbox: React.FC<Props> = ({}) => {
  useEffect(() => {
    // socket.on("receive_message", (data) => {
    //   setMes((prev) => [...prev, data]);
    // });
    console.log(mess);
    bottomRef.current?.scrollIntoView({});
  }, []);

  const [mess, setMes] = useState<{ message: string }[]>([]);
  const [m, setM] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // await socket.emit("send_message", { message: m });
    // console.log(m);
    // setM("");
  };

  return (
    <div className="flex flex-col w-2/3 border-r border-slate-700">
      <ChatHeader />
      <div className="h-screen overflow-y-scroll">
        <div className="flex flex-col">
          {mess.map((item) => (
            <ReceiveBox key={item.message} message={item.message} />
          ))}
          <div ref={bottomRef}></div>
        </div>
      </div>
      <ChatBox handleSend={handleSend} m={m} setM={setM} />
    </div>
  );
};

export default Chatbox;
