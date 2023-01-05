import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { usePrivateMutation } from "../common/hooks/usePrivateMutation";
import { iUser } from "../common/model";
import { iNewMessage } from "../pages/Home/components/MessageArea/model";

export default {
  getMessages: (
    queryClient: QueryClient,
    api: AxiosInstance,
    conversation_id: number | undefined,
    isFetch: boolean
  ) => {
    return useQuery(
      ["message_list"],
      async () => {
        try {
          const res = await api.get(`message/get-all/${conversation_id}`);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      { enabled: isFetch }
    );
  },
  sendMessage: (queryClient: QueryClient, api: AxiosInstance) => {
    return useMutation({
      mutationFn: async (newMessageData: iNewMessage) => {
        try {
          const res = await api.post("message/send", newMessageData);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      onMutate: async (variables) => {
        await queryClient.cancelQueries(["message_list"]);

        const previousMessages = queryClient.getQueryData(["todos"]);

        queryClient.setQueryData(["message_list"], (old: any) => [
          ...old,
          variables,
        ]);

        return { previousMessages };
      },
    });
  },
};
