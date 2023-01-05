import React, { useState } from "react";
import Inbox from "./Inbox";
import {
  useQueryClient,
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "@tanstack/react-query";
import { iRoom } from "../../../model";
import { useRoomContext } from "../../../../../common/hooks/useRoomContext";

type Props = {
  inboxLoading: boolean;
  inbox_data: Array<iRoom>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

const index: React.FC<Props> = ({ inboxLoading, inbox_data, refetch }) => {
  const queryClient = useQueryClient();

  const { setCurrentRoom } = useRoomContext();

  if (inboxLoading) {
    return <div className="">Loading...</div>;
  }
  const [selectedInbox, setSelectedInbox] = useState<number>(0);

  const handleClick = (inbox: iRoom, index: number) => {
    setCurrentRoom(inbox);
    setSelectedInbox(index);
    refetch();
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {inbox_data.map((inbox, index) => {
          return (
            <Inbox
              index={index}
              selectedInbox={selectedInbox}
              handleClick={() => handleClick(inbox, index)}
              key={inbox.conversation_id}
              data={inbox}
            />
          );
        })}
      </div>
    </div>
  );
};

export default index;
