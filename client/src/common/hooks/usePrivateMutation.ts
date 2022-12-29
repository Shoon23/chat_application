import { useMutation } from "@tanstack/react-query";

import { AxiosInstance } from "axios";
import { QueryClient } from "@tanstack/react-query";
import { iUser } from "../model";
import { privateAxios } from "../../lib/custom-axios/privateAxios";

export const usePrivateMutation = (
  queryClient: QueryClient,
  url: string,
  api: AxiosInstance,
  onSuccess?:
    | ((
        data?: any,
        variables?: number | undefined,
        context?: unknown
      ) => unknown)
    | undefined,
  onSettled?:
    | ((
        data?: any,
        error?: unknown,
        variables?: number | undefined,
        context?: unknown
      ) => unknown)
    | undefined,
  onError?:
    | ((
        error?: unknown,
        variables?: number | undefined,
        context?: unknown
      ) => unknown)
    | undefined,
  onMutate?: ((variables?: number | undefined) => unknown) | undefined
) => {
  const user = queryClient.getQueryData<iUser>(["user"]);
  return useMutation({
    mutationFn: async (postData: any) => {
      try {
        const res = await api.post(
          url,
          { postData },
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onError,
    onSuccess,
    onSettled,
    onMutate,
  });
};
