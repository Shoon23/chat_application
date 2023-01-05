import { Request, Response } from "express";
import { db } from "../config/ConnectDB";

export const send_controller = (req: Request, res: Response) => {
  const conversation = req.body.conversation;
  const message_body = req.body.message_body;
  const sender_id = req.body.sender_id;

  const add_message =
    "INSERT INTO message(conversation,message_body,sender_id) VALUES(?);";

  const values = [conversation, message_body, sender_id];

  db.query(add_message, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const get_message =
      "SELECT * FROM message WHERE  conversation = ? ORDER BY date_sent DESC LIMIT 1;";
    db.query(get_message, [conversation], (err, data) => {
      if (err) return res.status(500).json(err);

      res.status(201).json(data[0]);
    });
  });
};

export const get_all_message = (req: Request, res: Response) => {
  const conversation_id = req.params.conversation_id;

  const get_messages = "SELECT * FROM message WHERE conversation = ?;";

  db.query(get_messages, [conversation_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};
