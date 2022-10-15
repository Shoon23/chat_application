import React from "react";
import Rightbar from "./components/Rightbar";
import MessageArea from "./components/MessageArea";
import Inbox from "./components/Inbox";

type Props = {};

const App: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Inbox />
      <MessageArea />
      <Rightbar />
    </div>
  );
};

export default App;
