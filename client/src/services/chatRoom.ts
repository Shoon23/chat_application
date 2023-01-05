import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { iNewRoom } from "../pages/Home/model";

export default {
  getInbox: (
    api: AxiosInstance,
    queryClient: QueryClient,
    user_id: number | undefined
  ) => {
    let isEnabled = user_id !== undefined;
    // return useMutation({
    //   mutationFn: async (user_id: any) => {
    //     try {
    //       const res = await api.get(`chat-room/inbox/${user_id}`);
    //       return res.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    //   onSuccess(data, variables, context) {
    //     queryClient.setQueryData(["inbox_list"], data);
    //   },
    // });
    return useQuery(
      ["inbox_list"],
      async () => {
        try {
          const res = await api.get(`chat-room/inbox/${user_id}`);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      { enabled: isEnabled }
    );
  },
  createRoom: (
    queryClient: QueryClient,
    api: AxiosInstance,
    onSuccess?: ((data: any) => unknown) | undefined
  ) => {
    return useMutation({
      mutationFn: async (new_room: iNewRoom) => {
        try {
          const res = await api.post("chat-room/create", new_room);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      onSuccess,
    });
  },
};
