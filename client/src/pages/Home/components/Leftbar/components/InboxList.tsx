import React from "react";
import Avatar from "./Inbox";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";
import { iRoom } from "../../../model";

type Props = {
  inboxLoading: boolean;
  inbox_data: Array<iRoom>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iRoom | undefined>>;
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    number | undefined,
    unknown
  >;
};

const index: React.FC<Props> = ({
  inboxLoading,
  inbox_data,
  setCurrentRoom,
  mutate,
}) => {
  if (inboxLoading) {
    return <div className="">Loading...</div>;
  }

  const handleClick = (inbox: iRoom) => {
    mutate(inbox.room_id);
    setCurrentRoom(inbox);
  };
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {inbox_data.map((inbox) => {
          return (
            <Avatar
              handleClick={() => handleClick(inbox)}
              key={inbox.room_id}
              data={inbox}
            />
          );
        })}
      </div>
    </div>
  );
};

export default index;
