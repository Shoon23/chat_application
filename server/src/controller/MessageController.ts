import { Request, Response } from "express";
import { db } from "../config/ConnectDB";

export const send_controller = (req: Request, res: Response) => {
  const room_id = req.body.room_id;
  const message_body = req.body.message_body;
  const sender_id = req.body.sender_id;

  const add_message =
    "INSERT INTO message(room_id,message_body,sender_id) VALUES(?);";

  const values = [room_id, message_body, sender_id];

  db.query(add_message, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const get_message =
      "SELECT * FROM message WHERE room_id = ? ORDER BY date_sent DESC LIMIT 1;";
    db.query(get_message, [room_id], (err, data) => {
      if (err) return res.status(500).json(err);

      res.status(201).json(data[0]);
    });
  });
};

export const get_all_message = (req: Request, res: Response) => {
  const room_id = req.body.room_id;

  const get_messages = "SELECT * FROM message WHERE room_id = ?;";

  db.query(get_messages, [room_id], (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log(data);
    res.status(200).json(data);
  });
};
