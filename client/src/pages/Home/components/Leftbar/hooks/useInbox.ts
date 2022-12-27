import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetch_instance } from "../../../../../services/custom-axios-fetch";
import { cqueryClient } from "../../../../../App";
import { iUser } from "../../../../../middleware/interface/iUser";
import { useNavigate } from "react-router-dom";

export const useInbox = (user_id: any) => {
  const navigate = useNavigate();

  const data = cqueryClient.getQueryData<iUser>(["user"]);

  return useQuery({
    queryKey: ["inbox_list"],
    queryFn: async () => {
      return await fetch_instance.post(
        "chat-room/inbox",
        {
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        }
      );
    },
    onError(err: AxiosError) {},
  });
};
