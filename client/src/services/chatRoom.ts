import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { iNewRoom } from "../pages/Home/model";

export default {
  getInbox: (user_id: any, api: AxiosInstance) => {
    return useQuery({
      queryKey: ["inbox_list"],
      queryFn: async () => {
        return await api.get(`chat-room/inbox/${user_id}`);
      },
      onError(err: AxiosError) {},
    });
  },
  createRoom: (queryClient: QueryClient, api: AxiosInstance) => {
    return useMutation({
      mutationFn: async (new_room: iNewRoom) => {
        try {
          const res = await api.post("chat-room/create", new_room);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      onSuccess(data, variables, context) {
        queryClient.setQueryData(["inbox_list"], (oldData: any) => {
          return [...oldData, data];
        });
      },
    });
  },
};
