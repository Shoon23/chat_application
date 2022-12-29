import React from "react";

import { UseMutateFunction } from "@tanstack/react-query";
import { usePrivateAxios } from "../../../../../common/hooks/usePrivateAxios";
import { iUser } from "../../../../../common/model";
import { AxiosResponse } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import chatRoom from "../../../../../services/chatRoom";
import { iRoom } from "../../../model";
type Props = {
  data: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  set_is_display: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iRoom | undefined>>;
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    number | undefined,
    unknown
  >;
};

const SearchResult: React.FC<Props> = ({
  data,
  set_is_display,
  setCurrentRoom,
  mutate,
}) => {
  const queryClient = useQueryClient();
  const api = usePrivateAxios(queryClient);
  const user = queryClient.getQueryData<iUser>(["user"]);

  const { mutate: create_room, data: room_data } = chatRoom.createRoom(
    queryClient,
    api
  );

  const handleClick = () => {
    const new_room = {
      receiver_id: data.user_id,
      contact_name: `${data.first_name} ${data.last_name}`,
      user_id: user?.user_id,
    };
    create_room(new_room);
    setCurrentRoom(room_data);
    mutate(room_data?.room_id);
    set_is_display(false);
  };
  return (
    <div
      onClick={handleClick}
      className="flex flex-row gap-2 m-2 w-10/12 hover:bg-gray-700 h-20 items-center rounded-3xl self-center "
    >
      <div className="avatar">
        <div className="w-14 h-14 rounded-full m-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{`${data.first_name} ${data.last_name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
