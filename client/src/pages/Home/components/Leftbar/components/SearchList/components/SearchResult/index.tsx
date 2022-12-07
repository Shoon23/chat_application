import React from "react";

type Props = {
  data: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
};

const index: React.FC<Props> = ({ data: { first_name, last_name } }) => {
  return (
    <div className="flex flex-row gap-2 m-2 w-10/12 hover:bg-gray-700 h-20 items-center rounded-3xl self-center ">
      <div className="avatar">
        <div className="w-14 h-14 rounded-full m-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{`${first_name} ${last_name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default index;
