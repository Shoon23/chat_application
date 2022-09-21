import React from "react";

type Props = {};

const Avatar: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-row gap-2 m-2 w-11/12 hover:bg-gray-700 h-20 items-center rounded-3xl">
      <div className="avatar online">
        <div className="w-14 h-14 rounded-full m-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Sean Wilfred T. Custodio</p>
          <p className="font-light text-sm">Good morning </p>
        </div>
        <span className="indicator-item badge badge-accent self-center m-3"></span>
      </div>
    </div>
  );
};

export default Avatar;
