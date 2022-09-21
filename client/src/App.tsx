import React from "react";
import Rightbar from "./components/Rightbar";
import Chatbox from "./components/Chatbox";
import Chats from "./components/Chats";

type Props = {};

const App: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Chats />
      <Chatbox />
      <Rightbar />
    </div>
  );
};

export default App;
