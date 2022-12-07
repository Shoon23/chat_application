import React from "react";
import Avatar from "./Avatar";

type Props = {};

const index: React.FC<Props> = ({}) => {
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col last:mb-3">
        {/* <SearchResult /> */}
        <Avatar />
      </div>
    </div>
  );
};

export default index;
