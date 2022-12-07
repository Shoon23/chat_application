import React from "react";
import Leftbar from "./components/Leftbar";
import MessageArea from "./components/MessageArea";
import Rightbar from "./components/Rightbar";
type Props = {};

const Home: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Leftbar />
      <MessageArea />
      <Rightbar />
    </div>
  );
};

export default Home;
