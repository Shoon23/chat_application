import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { iSearch } from "../interface/iSearch";
import { fetch_instance } from "../../../../../services/custom-axios-fetch";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../../../../../middleware/interface/iUser";

import { AxiosError } from "axios";

export const useSearch = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const data = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (search_item: iSearch) => {
      return await fetch_instance.post("chat-room/find", search_item, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });
    },
    onError(error: AxiosError, variables, context) {},
  });
};
