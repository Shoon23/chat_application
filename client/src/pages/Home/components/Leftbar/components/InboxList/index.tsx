import React from "react";
import Avatar from "./Avatar";

type Props = {
  isLoading: boolean;
  data: Array<{
    id: number;
    contact_name: string;
    last_message: string;
    is_seen: boolean;
    status: boolean;
  }>;
};

const index: React.FC<Props> = ({ isLoading, data }) => {
  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {data.map((data) => {
          return <Avatar key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default index;
