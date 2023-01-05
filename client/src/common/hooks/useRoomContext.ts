import { useContext } from "react";
import { RoomContext } from "../../context/RoomContext";
export const useRoomContext = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
};
