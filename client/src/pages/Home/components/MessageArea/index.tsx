import React, { FormEvent, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ReceiveBox from "./ReceiveBox";
import SendBox from "./SenderBox";
import ChatBox from "./ChatBox";
import { iRoom } from "../../interface/iRoom";
import { cqueryClient } from "../../../../App";
import { useMutation } from "@tanstack/react-query";
import { fetch_instance } from "../../../../services/custom-axios-fetch";
import { iUser } from "../../../../middleware/interface/iUser";
import { AxiosResponse } from "axios";
import Avatar from "../Leftbar/components/InboxList/Avatar";
import { iData } from "../Leftbar/components/InboxList";

type Props = {
  data: AxiosResponse<any, any> | undefined;
  currentRoom: iData | undefined;
};

interface iMessage {
  date_sent: string;
  message_body: string;
  message_id: number;
  room_id: string;
  sender_id: number;
}

interface iNewMessage {
  room_id: string | undefined;
  sender_id: number | undefined;
  message_body: string | undefined;
}

const Chatbox: React.FC<Props> = ({ data, currentRoom }) => {
  const user = cqueryClient.getQueryData<iUser>(["user"]);
  const messages = cqueryClient.getQueryData<Array<iMessage>>(["message_list"]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({});
  }, [messages]);

  const [newMessage, setNewMessage] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { mutate } = useMutation({
    mutationFn: async (newMessageData: iNewMessage) => {
      try {
        const res = await fetch_instance.post("message/send", newMessageData, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess(data, variables, context) {
      cqueryClient.setQueryData(["message_list"], (oldData: any) => {
        return [...oldData, data];
      });
    },
    onSettled: () => {
      cqueryClient.invalidateQueries(["message_list"]);
    },
  });

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      room_id: currentRoom?.room_id,
      sender_id: user?.user_id,
      message_body: newMessage,
    };
    mutate(message);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-2/3 border-r border-slate-700">
      {currentRoom ? (
        <>
          <ChatHeader name={currentRoom.contact_name} />
          <div className="h-screen overflow-y-scroll">
            <div className="flex flex-col">
              {messages?.map((mess) => {
                if (mess.sender_id == user?.user_id) {
                  return (
                    <SendBox
                      key={mess.message_id}
                      message={mess.message_body}
                    />
                  );
                }
                return (
                  <ReceiveBox
                    key={mess.message_id}
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
        <div className="">no rooms are open </div>
      )}
    </div>
  );
};

export default Chatbox;
