import React, { useState } from "react";
import InboxList from "./components/InboxList";
import SearcList from "./components/SearchList";
import { iSearch } from "./interface/iSearch";
import { useSearch } from "./hooks/useSearch";
type Props = {};

const Chats: React.FC<Props> = ({}) => {
  const mutation = useSearch();
  const [search_item, set_search_item] = useState<iSearch>({
    search_item: "",
  });

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutation.mutate(search_item);

      // console.log(mutation.data?.data);
    }
  };

  return (
    <div className="flex flex-col w-1/3 border-r border-slate-700">
      <h1 className="text-center font-bold text-2xl m-2">Chats</h1>
      <div className="form-control flex my-2 border-b border-slate-700 pb-4">
        <input
          type="text"
          className="input input-bordered input-md self-center w-11/12"
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            set_search_item({ search_item: e.target.value })
          }
          onKeyUp={onSearch}
        />
      </div>
      {/* <InboxList />
       */}

      <SearcList isLoading={mutation.isLoading} data={mutation.data?.data} />
    </div>
  );
};

export default Chats;
