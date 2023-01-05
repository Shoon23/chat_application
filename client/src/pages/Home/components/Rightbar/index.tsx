import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../../../../common/model";
import Profile from "./components/Profile";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import OnlineList from "./components/OnlineList";
import authentication from "../../../../services/authentication";
import { usePrivateAxios } from "../../../../common/hooks/usePrivateAxios";
import { Socket } from "socket.io-client";
import { iOnlineUser } from "./model";
import { iRoom } from "../../model";

type Props = {
  user: iUser | undefined;
  onlineUsers: Array<iOnlineUser>;
  socket: React.MutableRefObject<Socket | undefined>;
};

const Rightbar: React.FC<Props> = ({ user, onlineUsers, socket }) => {
  const queryClient = useQueryClient();
  const { mutate: logout } = authentication.logout(queryClient);

  return (
    <div className="w-1/4 flex flex-col">
      <ArrowLeftOnRectangleIcon
        onClick={() => logout()}
        className="self-end m-2 p-0 w-12 h-12 stroke-red-600  hover:bg-slate-700 rounded-md"
      />
      <Profile user={user} />
      <OnlineList onlineUsers={onlineUsers} socket={socket} />
    </div>
  );
};

export default Rightbar;
