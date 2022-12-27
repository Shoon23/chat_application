import React from "react";
import Avatar from "./Avatar";
import { cqueryClient } from "../../../../../../App";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";

type Props = {
  isLoading: boolean;
  data: Array<{
    id: number;
    contact_name: string;
    last_message: string;
    is_seen: boolean;
    status: boolean;
    room_id: string;
    user_id: number | undefined;
  }>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iData | undefined>>;
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    string | undefined,
    unknown
  >;
};

export interface iData {
  id: number;
  contact_name: string;
  last_message: string;
  is_seen: boolean;
  status: boolean;
  room_id: string;
  user_id: number | undefined;
}
const index: React.FC<Props> = ({
  isLoading,
  data,
  setCurrentRoom,
  mutate,
}) => {
  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  const handleClick = (data: iData) => {
    mutate(data.room_id);
    setCurrentRoom(data);
  };
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {data.map((data) => {
          return (
            <Avatar
              handleClick={() => handleClick(data)}
              key={data.id}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default index;
