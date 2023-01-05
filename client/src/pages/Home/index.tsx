import React, { useEffect, useState, useRef } from "react";
import Leftbar from "./components/Leftbar";
import chatRoom from "../../services/chatRoom";
import users from "../../services/users";
import MessageArea from "./components/MessageArea";
import Rightbar from "./components/Rightbar";
import { iUser } from "../../common/model";
import { iOnlineUser } from "./model";
import { useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import message from "../../services/message";
import { usePrivateAxios } from "../../common/hooks/usePrivateAxios";
import { useRoomContext } from "../../common/hooks/useRoomContext";
type Props = {};

const Home: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const api = usePrivateAxios(queryClient);
  const socket = useRef<Socket>();
  const user = queryClient.getQueryData<iUser>(["user"]);
  const searchMutation = users.findUsers(api, user?.user_id);
  const { currentRoom, setCurrentRoom } = useRoomContext();
  const { isLoading: inboxLoading, data: inbox_data } = chatRoom.getInbox(
    api,
    queryClient,
    user?.user_id
  );
  const {
    data: messages,
    isFetching: messageFetching,
    refetch,
  } = message.getMessages(
    queryClient,
    api,
    currentRoom?.conversation_id,
    currentRoom?.conversation_id > 0
  );
  const [onlineUsers, setOnlineUsers] = useState<Array<iOnlineUser>>([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8080");
  }, []);

  useEffect(() => {
    socket.current?.on("getMessage", (data: any) => {
      queryClient.setQueryData(["message_list"], (old: any) => [
        ...old,
        {
          conversation: data.conversation,
          sender_id: data.senderId,
          message_body: data.message,
          date_sent: new Date().toUTCString(),
        },
      ]);
    });
  }, [socket.current]);

  useEffect(() => {
    setCurrentRoom(inbox_data?.[0]);
  }, [inbox_data]);

  useEffect(() => {
    socket.current?.emit("addUser", user?.user_id);
    socket.current?.on("getUsers", (data) => {
      setOnlineUsers(data);
    });
  }, [user, socket.current]);
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Leftbar
        searchMutation={searchMutation}
        inboxLoading={inboxLoading}
        inbox_data={inbox_data}
        refetch={refetch}
      />
      <MessageArea
        socket={socket}
        messages={messages}
        messageFetching={messageFetching}
      />
      <Rightbar user={user} onlineUsers={onlineUsers} socket={socket} />
    </div>
  );
};

export default Home;
