import React from "react";
import { cqueryClient } from "../../../../../../../../App";
import { useMutation, UseMutateFunction } from "@tanstack/react-query";
import { fetch_instance } from "../../../../../../../../services/custom-axios-fetch";
import { iUser } from "../../../../../../../../middleware/interface/iUser";
import { AxiosError, AxiosResponse } from "axios";
import { iData } from "../../../InboxList";
type Props = {
  data: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  set_is_display: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iData | undefined>>;
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    string | undefined,
    unknown
  >;
};

interface new_room {
  user_id: number | undefined;
  receiver_id: number;
  contact_name: string;
}

const index: React.FC<Props> = ({
  data,
  set_is_display,
  setCurrentRoom,
  mutate,
}) => {
  const user = cqueryClient.getQueryData<iUser>(["user"]);
  const { mutate: create_room } = useMutation({
    mutationFn: async (new_room: new_room) => {
      return await fetch_instance.post("chat-room/create", new_room, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
    },
    onSuccess(data, variables, context) {
      cqueryClient.invalidateQueries(["inbox_list"]);
      console.log(data.data.room_id);
      setCurrentRoom(data.data);
      mutate(data.data.room_id);
    },
  });
  const handleClcik = () => {
    const new_room = {
      receiver_id: data.user_id,
      contact_name: `${data.first_name} ${data.last_name}`,
      user_id: user?.user_id,
    };
    create_room(new_room);
    set_is_display(false);
  };
  return (
    <div
      onClick={handleClcik}
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

export default index;
