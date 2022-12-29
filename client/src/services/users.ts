import { iSearch } from "../pages/Home/components/Leftbar/model";

import { AxiosError, AxiosInstance } from "axios";
import { useMutation } from "@tanstack/react-query";

export default {
  findUsers: (api: AxiosInstance) => {
    return useMutation({
      mutationFn: async (search_item: iSearch) => {
        try {
          const res = await api.post("chat-room/find", search_item);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      onError(error: AxiosError, variables, context) {},
    });
  },
};
