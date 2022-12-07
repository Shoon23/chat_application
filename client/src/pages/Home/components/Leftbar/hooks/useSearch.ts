import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { iSearch } from "../interface/iSearch";

export const useSearch = () => {
  return useMutation({
    mutationFn: async (search_item: iSearch) => {
      return await axios.post(
        "http://localhost:3000/chat-room/find",
        search_item
      );
    },
    onSuccess(data, variables, context) {
      console.log(data);
    },
  });
};
