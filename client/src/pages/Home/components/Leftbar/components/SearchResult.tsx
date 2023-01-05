import React from "react";
import { useRoomContext } from "../../../../../common/hooks/useRoomContext";
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
};

const SearchResult: React.FC<Props> = ({
  data: { first_name, last_name, user_id },
  set_is_display,
}) => {
  const queryClient = useQueryClient();
  const api = usePrivateAxios(queryClient);
  const user = queryClient.getQueryData<iUser>(["user"]);
  const { setCurrentRoom } = useRoomContext();

  const onSuccess = (data: any) => {
    queryClient.setQueryData(["inbox_list"], (oldData: any) => {
      const isInclude = oldData.some((item: any) => {
        return item.conversation_id == data.conversation_id;
      });
      setCurrentRoom({
        ...data,
        first_name,
        last_name,
      });

      if (isInclude) {
        return oldData;
      } else {
        return [...oldData, { ...data, first_name, last_name }];
      }
    });
  };

  const { mutate: create_room, data: room_data } = chatRoom.createRoom(
    queryClient,
    api,
    onSuccess
  );

  const handleClick = () => {
    const new_room = {
      receiver_id: user_id,
      sender_id: user?.user_id,
    };
    create_room(new_room);

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
          <p className="font-semibold">{`${first_name} ${last_name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
