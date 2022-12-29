import React, { useState } from "react";
import InboxList from "./components/InboxList";
import SearchList from "./components/SearchList";
import { iSearch } from "./model";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { UseMutationResult, UseMutateFunction } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { iRoom } from "../../model";

type Props = {
  inboxLoading: boolean;
  inbox_data: AxiosResponse<any, any> | undefined;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iRoom | undefined>>;
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    number | undefined,
    unknown
  >;
  searchMutation: UseMutationResult<
    any,
    AxiosError<unknown, any>,
    iSearch,
    unknown
  >;
};

const Leftbar: React.FC<Props> = ({
  searchMutation,
  inboxLoading,
  inbox_data,
  setCurrentRoom,
  mutate,
}) => {
  const [search_item, set_search_item] = useState<iSearch>({
    search_item: "",
  });
  const [is_display, set_is_display] = useState<boolean>(false);
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    set_is_display(true);
    if (search_item.search_item === "") return;
    if (e.key === "Enter") {
      searchMutation.mutate(search_item);
    }
  };

  return (
    <div className="flex flex-col w-1/3 border-r border-slate-700">
      <h1 className="text-center font-bold text-2xl m-2">Chats</h1>
      <div className="form-control flex flex-row my-2 border-b border-slate-700 pb-4 w-full">
        {is_display && (
          <ArrowLongRightIcon
            onClick={() => set_is_display(false)}
            className="w-9 h-10 hover:bg-gray-700 self-center rounded-lg mr-1"
          />
        )}
        <input
          type="text"
          className="input input-bordered items-center self-center input-md w-full mr-1"
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            set_search_item({ search_item: e.target.value })
          }
          onKeyUp={onSearch}
        />
      </div>
      {is_display ? (
        <SearchList
          isLoading={searchMutation.isLoading}
          setCurrentRoom={setCurrentRoom}
          mutate={mutate}
          set_is_display={set_is_display}
          search_list={searchMutation?.data}
        />
      ) : inbox_data?.data ? (
        <InboxList
          inbox_data={inbox_data?.data}
          inboxLoading={inboxLoading}
          setCurrentRoom={setCurrentRoom}
          mutate={mutate}
        />
      ) : (
        <div>Empty inbox</div>
      )}
    </div>
  );
};

export default Leftbar;
