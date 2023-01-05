export interface iOnlineUser {
  userId: number;
  socketId: string;
}

export interface iInbox {
  receiver_id: number;
  conversation_id: number;
  first_name: string;
  last_name: string;
  sender_id: number;
}
