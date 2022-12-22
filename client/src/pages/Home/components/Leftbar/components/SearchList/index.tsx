import React from "react";
import SearchResult from "./components/SearchResult";

type Props = {
  isLoading: boolean;
  data: Array<{
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  }>;
};

const index: React.FC<Props> = ({ isLoading, data }) => {
  if (isLoading) {
    return <div className="">loading</div>;
  }
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {data ? (
          data?.map((data) => {
            return <SearchResult key={data.user_id} data={data} />;
          })
        ) : (
          <p>not found</p>
        )}
      </div>
    </div>
  );
};

export default index;
