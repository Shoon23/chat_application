import React, { FormEvent, useEffect, useRef, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ReceiveBox from "./components/ReceiveBox";
import SendBox from "./components/SendBox";
import ChatBox from "./components/ChatBox";
import { iUser } from "../../../../common/model";
import { iRoom } from "../../model";
import { Socket } from "socket.io-client";
import { iMessageList } from "./model";
import message from "../../../../services/message";
import { useQueryClient } from "@tanstack/react-query";
import { usePrivateAxios } from "../../../../common/hooks/usePrivateAxios";

type Props = {
  currentRoom: iRoom | undefined;
  socket: React.MutableRefObject<Socket | undefined>;
};

const MessageArea: React.FC<Props> = ({ currentRoom, socket }) => {
  const queryClient = useQueryClient();
  const api = usePrivateAxios(queryClient);
  const user = queryClient.getQueryData<iUser>(["user"]);
  const messages = queryClient.getQueryData<Array<iMessageList>>([
    "message_list",
  ]);
  const { mutate } = message.sendMessage(queryClient, api);
  const [newMessage, setNewMessage] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      queryClient.setQueryData(["message_list"], (oldData: any) => {
        return [
          ...oldData,
          {
            sender_id: data.receiverId,
            message_body: data.message,
            date_sent: Date.now(),
          },
        ];
      });
    });
    bottomRef.current?.scrollIntoView({});
  }, [messages]);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      room_id: currentRoom?.room_id,
      sender_id: user?.user_id,
      message_body: newMessage,
    };
    mutate(message);
    let receiverId;
    if (currentRoom?.user_one !== user?.user_id) {
      receiverId = currentRoom?.user_one;
    } else {
      receiverId = currentRoom?.user_two;
    }

    socket.current?.emit("sendMessage", {
      senderId: user?.user_id,
      receiverId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-2/3 border-r border-slate-700">
      {currentRoom ? (
        <>
          <ChatHeader />
          <div className="h-screen overflow-y-scroll">
            <div className="flex flex-col">
              {messages?.map((mess) => {
                if (mess.sender_id === user?.user_id) {
                  return (
                    <SendBox key={mess.date_sent} message={mess.message_body} />
                  );
                }
                return (
                  <ReceiveBox
                    key={mess.date_sent}
                    message={mess.message_body}
                  />
                );
              })}
              <div ref={bottomRef}></div>
            </div>
          </div>
          <ChatBox
            handleSend={handleSend}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </>
      ) : (
        <div className="">Loading</div>
      )}
    </div>
  );
};

export default MessageArea;
