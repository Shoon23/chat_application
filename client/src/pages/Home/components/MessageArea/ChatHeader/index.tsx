import React from "react";
import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";

type Props = {
  name: string;
};

const ChatHeader: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex flex-row justify-between border-b border-slate-700">
      <div className="avatar flex place-items-center my-5 ml-2 gap-4">
        <div className="w-14 h-14 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
        <p className="font-bold">{name}</p>
      </div>
      <div className="flex mr-5 place-items-center gap-2">
        <PhoneIcon className="w-8 h-8 p-1 rounded-lg hover:bg-gray-700" />
        <VideoCameraIcon className="w-8 h-8 p-1 rounded-lg hover:bg-gray-700" />
      </div>
    </div>
  );
};

export default ChatHeader;
