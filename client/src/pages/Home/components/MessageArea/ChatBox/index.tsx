import React, { FormEventHandler, SetStateAction } from "react";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

type Props = {
  handleSend: FormEventHandler<HTMLFormElement>;
  m: string;
  setM: React.Dispatch<React.SetStateAction<string>>;
};

const Chatbox: React.FC<Props> = ({ handleSend, m, setM }) => {
  return (
    <form
      onSubmit={handleSend}
      className="p-2 h-max flex justify-center border border-slate-700 gap-2 "
    >
      <div className="self-center flex gap-1">
        <PhotoIcon className="w-10 h-10 p-1 rounded-lg hover:bg-gray-700" />
        <FaceSmileIcon className="w-10 h-10 p-1 rounded-lg hover:bg-gray-700" />
      </div>
      <input
        type="text"
        placeholder="Aa..."
        className="input input-bordered w-3/4"
        onChange={(e) => setM(e.target.value)}
        value={m}
      />
      <button type="submit" className="self-center">
        <PaperAirplaneIcon className=" w-10 h-10 p-1 rounded-lg hover:bg-gray-700" />
      </button>
    </form>
  );
};

export default Chatbox;
