export interface iMessageList {
  date_sent: string;
  message_body: string;
  message_id: number;
  room_id: string;
  sender_id: number;
}

export interface iNewMessage {
  room_id: number | undefined;
  sender_id: number | undefined;
  message_body: string | undefined;
}
