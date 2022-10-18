import React from "react";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

type Props = {};

const Chatbox: React.FC<Props> = ({}) => {
  return (
    <div className="p-2 h-max flex justify-center border border-slate-700 gap-2">
      <div className="self-center flex gap-1">
        <PhotoIcon className="w-7 h-7" />
        <FaceSmileIcon className="w-7 h-7" />
      </div>
      <input
        type="text"
        placeholder="Aa..."
        className="input input-bordered w-3/4"
      />
      <PaperAirplaneIcon className="self-center w-7 h-7" />
    </div>
  );
};

export default Chatbox;
