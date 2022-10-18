import React from "react";
import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";

type Props = {};

const ChatHeader: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-row justify-between border-b border-slate-700">
      <div className="avatar flex place-items-center my-5 ml-2 gap-4">
        <div className="w-14 h-14 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
        <p className="font-bold">Sean Wilfred T. Custodio</p>
      </div>
      <div className="flex mr-5 place-items-center gap-2">
        <PhoneIcon className="w-6 h-6" />
        <VideoCameraIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default ChatHeader;
