export interface iRoom {
  room_id: number;
  user_one: number | undefined;
  user_two: number | undefined;
}
export interface iNewRoom {
  user_id: number | undefined;
  receiver_id: number;
  contact_name: string;
}
