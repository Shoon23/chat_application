import { AxiosResponse } from "axios";
import React from "react";
import { iRoom } from "../../../model";
import SearchResult from "./SearchResult";
import { UseMutateFunction } from "@tanstack/react-query";

type Props = {
  isLoading: boolean;
  search_list: Array<{
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  }>;
  set_is_display: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchList: React.FC<Props> = ({
  isLoading,
  search_list,
  set_is_display,
}) => {
  if (isLoading) {
    return <div className="">loading</div>;
  }
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {search_list ? (
          search_list?.map((search_data) => {
            return (
              <SearchResult
                key={search_data.user_id}
                data={search_data}
                set_is_display={set_is_display}
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

export default SearchList;
