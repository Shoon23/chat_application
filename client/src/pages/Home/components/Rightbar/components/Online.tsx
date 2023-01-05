import React from "react";

type Props = {
  first_name: string;
  last_name: string;
};

const Online: React.FC<Props> = ({ first_name, last_name }) => {
  return (
    <div
      className={`flex flex-row gap-2 m-1 w-full hover:bg-gray-700 h-18 items-center rounded-3xl $`}
    >
      <div className="avatar online">
        <div className="w-10 h-10 rounded-full m-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <p className="font-semibold self-center">{`${first_name} ${last_name}`}</p>

        <span className="indicator-item badge badge-accent self-center m-3"></span>
      </div>
    </div>
  );
};

export default Online;
