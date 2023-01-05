export interface iNewRoom {
  sender_id: number | undefined;
  receiver_id: number;
}

export interface iRoom {
  receiver_id: number;
  conversation_id: number;
  first_name: string;
  last_name: string;
  sender_id: number;
}

export interface iOnlineUser {
  userId: number;
  socketId: string;
}
