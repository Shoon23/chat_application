import React, { useState } from "react";
import InboxList, { iData } from "./components/InboxList";
import SearcList from "./components/SearchList";
import { iSearch } from "./interface/iSearch";
import { useSearch } from "./hooks/useSearch";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { useInbox } from "./hooks/useInbox";
import { UseMutationResult, UseMutateFunction } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type Props = {
  mutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    iSearch,
    unknown
  >;
  isLoading: boolean;
  data: AxiosResponse<any, any> | undefined;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iData | undefined>>;
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    string | undefined,
    unknown
  >;
};

const Chats: React.FC<Props> = ({
  mutation,
  isLoading,
  data,
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
      mutation.mutate(search_item);
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
        <SearcList
          isLoading={mutation.isLoading}
          data={mutation.data?.data}
          set_is_display={set_is_display}
          setCurrentRoom={setCurrentRoom}
          mutate={mutate}
        />
      ) : data?.data ? (
        <InboxList
          data={data?.data}
          isLoading={isLoading}
          setCurrentRoom={setCurrentRoom}
          mutate={mutate}
        />
      ) : (
        <div>Empty inbox</div>
      )}
    </div>
  );
};

export default Chats;
