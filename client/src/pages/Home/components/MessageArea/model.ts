export interface iMessageList {
  message_body: string;
  sender_id: number;
  date_sent: string;
  conversation: number;
}

export interface iNewMessage {
  conversation: number | undefined;
  sender_id: number | undefined;
  message_body: string | undefined;
}
