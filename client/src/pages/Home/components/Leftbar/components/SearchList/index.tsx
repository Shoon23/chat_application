import { AxiosResponse } from "axios";
import React from "react";
import { iData } from "../InboxList";
import SearchResult from "./components/SearchResult";
import { UseMutateFunction } from "@tanstack/react-query";

type Props = {
  isLoading: boolean;
  data: Array<{
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  }>;
  set_is_display: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iData | undefined>>;
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    string | undefined,
    unknown
  >;
};

const index: React.FC<Props> = ({
  isLoading,
  data,
  set_is_display,
  setCurrentRoom,
  mutate,
}) => {
  if (isLoading) {
    return <div className="">loading</div>;
  }
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {data ? (
          data?.map((data) => {
            return (
              <SearchResult
                key={data.user_id}
                data={data}
                set_is_display={set_is_display}
                setCurrentRoom={setCurrentRoom}
                mutate={mutate}
              />
            );
          })
        ) : (
          <p>not found</p>
        )}
      </div>
    </div>
  );
};

export default index;
