import React, { useEffect, useState, useRef } from "react";
import Leftbar from "./components/Leftbar";
import chatRoom from "../../services/chatRoom";
import users from "../../services/users";
import MessageArea from "./components/MessageArea";
import Rightbar from "./components/Rightbar";
import { iUser } from "../../common/model";
import { iRoom } from "./model";
import { useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import message from "../../services/message";
import { usePrivateAxios } from "../../common/hooks/usePrivateAxios";

type Props = {};

const Home: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const api = usePrivateAxios(queryClient);
  const socket = useRef<Socket>();
  const user = queryClient.getQueryData<iUser>(["user"]);
  const searchMutation = users.findUsers(api);
  const [currentRoom, setCurrentRoom] = useState<iRoom>();
  const { isLoading: inboxLoading, data: inbox_data } = chatRoom.getInbox(
    user?.user_id,
    api
  );
  const { mutate } = message.getMessages(queryClient, api);

  useEffect(() => {
    socket.current = io("ws://localhost:8080");
  }, []);

  useEffect(() => {
    setCurrentRoom(inbox_data?.data[0]);
    mutate(inbox_data?.data[0].room_id);
  }, [inbox_data?.data]);

  useEffect(() => {
    socket.current?.emit("addUser", user?.user_id);
  }, [user]);
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Leftbar
        searchMutation={searchMutation}
        inboxLoading={inboxLoading}
        inbox_data={inbox_data}
        setCurrentRoom={setCurrentRoom}
        mutate={mutate}
      />
      <MessageArea currentRoom={currentRoom} socket={socket} />
      <Rightbar />
    </div>
  );
};

export default Home;
