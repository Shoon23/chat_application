import React, { createContext, ReactNode, useState } from "react";
import { iRoom } from "../pages/Home/model";

interface RoomContextType {
  currentRoom: iRoom;
  setCurrentRoom: React.Dispatch<React.SetStateAction<iRoom>>;
}

const INITIAL_DATA = {
  receiver_id: 0,
  conversation_id: -1,
  first_name: "",
  last_name: "",
  sender_id: 0,
};

type Props = {
  children?: ReactNode;
};

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomContextProvider: React.FC<Props> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<iRoom>(INITIAL_DATA);

  return (
    <RoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
