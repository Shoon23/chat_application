import React, { useState } from "react";
import Leftbar from "./components/Leftbar";
import { useInbox } from "./components/Leftbar/hooks/useInbox";
import { useSearch } from "./components/Leftbar/hooks/useSearch";
import MessageArea from "./components/MessageArea";
import Rightbar from "./components/Rightbar";
import { cqueryClient } from "../../App";
import { iUser } from "../../middleware/interface/iUser";
import { iData } from "./components/Leftbar/components/InboxList";
import { useMutation } from "@tanstack/react-query";
import { fetch_instance } from "../../services/custom-axios-fetch";

type Props = {};

const Home: React.FC<Props> = ({}) => {
  const user = cqueryClient.getQueryData<iUser>(["user"]);
  const mutation = useSearch();
  const [currentRoom, setCurrentRoom] = useState<iData>();
  const { isLoading, data } = useInbox(user?.user_id);

  const { mutate } = useMutation({
    mutationFn: async (room_id: string | undefined) => {
      return await fetch_instance.post(
        "message/get-all",
        { room_id },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
    },
    onError(error, variables, context) {},
    onSuccess(data) {
      console.log(data.data);
      cqueryClient.setQueryData(["message_list"], data.data);
    },
  });

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Leftbar
        mutation={mutation}
        isLoading={isLoading}
        data={data}
        setCurrentRoom={setCurrentRoom}
        mutate={mutate}
      />
      <MessageArea data={data} currentRoom={currentRoom} />
      <Rightbar />
    </div>
  );
};

export default Home;
