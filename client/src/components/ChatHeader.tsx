import React from "react";
import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";

type Props = {};

const ChatHeader: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-row">
      <div className="avatar">
        <div className="w-14 h-14 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
        <PhoneIcon />
        <VideoCameraIcon />
      </div>
      <div className=""></div>
    </div>
  );
};

export default ChatHeader;
