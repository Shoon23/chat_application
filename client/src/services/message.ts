import { useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { usePrivateMutation } from "../common/hooks/usePrivateMutation";
import { iUser } from "../common/model";
import { iNewMessage } from "../pages/Home/components/MessageArea/model";

export default {
  getMessages: (queryClient: QueryClient, api: AxiosInstance) => {
    const user = queryClient.getQueryData<iUser>(["user"]);

    return useMutation({
      mutationFn: async (room_id: number | undefined) => {
        return await api.post("message/get-all", { room_id });
      },
      onSettled: () => {
        queryClient.invalidateQueries(["message_list"]);
      },
      onSuccess(data) {
        console.log(data.data);
        queryClient.setQueryData(["message_list"], data.data);
      },
    });
  },
  sendMessage: (queryClient: QueryClient, api: AxiosInstance) => {
    const user = queryClient.getQueryData<iUser>(["user"]);

    return useMutation({
      mutationFn: async (newMessageData: iNewMessage) => {
        try {
          const res = await api.post("message/send", newMessageData);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      onSuccess(data) {
        queryClient.setQueryData(["message_list"], (oldData: any) => {
          return [...oldData, data];
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(["message_list"]);
      },
    });
  },
};
