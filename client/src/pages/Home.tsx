import React from "react";
import Inbox from "../components/Inbox";
import MessageArea from "../components/MessageArea";
import Rightbar from "../components/Rightbar";

type Props = {};

const Home: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Inbox />
      <MessageArea />
      <Rightbar />
    </div>
  );
};

export default Home;
