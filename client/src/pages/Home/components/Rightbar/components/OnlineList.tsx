import React, { useEffect, useState } from "react";
import Online from "./Online";
import { useQueryClient } from "@tanstack/react-query";
import { iOnlineUser, iInbox } from "../model";
import { Socket } from "socket.io-client";

type Props = {
  onlineUsers: Array<iOnlineUser>;
  socket: React.MutableRefObject<Socket | undefined>;
};

const OnlineList: React.FC<Props> = ({ onlineUsers, socket }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Array<iInbox>>(["inbox_list"]);
  const [onlineFriends, setOnlineFriends] = useState<any[]>([]);
  function removeDuplicates(array1: any[], array2: any[]) {
    const array3: any[] = [];

    array1.map((arr1) => {
      array2.map((arr2) => {
        if (arr1.receiver_id === arr2.userId) {
          return array3.push(arr1);
        }
      });
    });

    return array3;
  }

  useEffect(() => {
    if (data !== undefined) {
      const a = removeDuplicates(data, onlineUsers);
      setOnlineFriends(a);
    }
  }, [onlineUsers]);

  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {onlineFriends ? (
          onlineFriends?.map((item: any, index: number) => {
            return (
              <Online
                key={index}
                first_name={item.first_name}
                last_name={item.last_name}
              />
            );
          })
        ) : (
          <div>no active user</div>
        )}
      </div>
    </div>
  );
};

export default OnlineList;
