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
import { useRoomContext } from "../../../../common/hooks/useRoomContext";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
  messages: Array<iMessageList>;
  messageFetching: boolean;
};

const MessageArea: React.FC<Props> = ({
  socket,
  messages,
  messageFetching,
}) => {
  const queryClient = useQueryClient();
  const api = usePrivateAxios(queryClient);
  const user = queryClient.getQueryData<iUser>(["user"]);
  const { mutate } = message.sendMessage(queryClient, api);
  const [newMessage, setNewMessage] = useState<string>("");
  const { currentRoom } = useRoomContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage) {
      return;
    }
    const message = {
      conversation: currentRoom?.conversation_id,
      sender_id: user?.user_id,
      message_body: newMessage,
    };
    mutate(message);
    socket.current?.emit("sendMessage", {
      conversation: currentRoom?.conversation_id,
      senderId: user?.user_id,
      receiverId: currentRoom?.receiver_id,
      message: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-2/3 border-r border-slate-700">
      {currentRoom ? (
        <>
          <ChatHeader currentRoom={currentRoom} />
          <div className="h-screen overflow-y-scroll">
            <div className="flex flex-col">
              {messageFetching ? (
                <div className="">fetching...</div>
              ) : (
                messages?.map((mess, i) => {
                  if (mess.sender_id === user?.user_id) {
                    return <SendBox key={i} message={mess.message_body} />;
                  }
                  return <ReceiveBox key={i} message={mess.message_body} />;
                })
              )}
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
