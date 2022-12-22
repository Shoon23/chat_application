import { Request, Response } from "express";
import { db } from "../config/ConnectDB";
import { v4 as uuidv4 } from "uuid";

export const create_room_controller = (req: Request, res: Response) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;

  const room_id = uuidv4();

  const insert_query =
    "INSERT INTO chat_room (room_id,sender_id,receiver_id) VALUES (?)";

  db.query(insert_query, [room_id, sender, receiver], (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({ messasage: "room created" });
  });
};

export const find_user = (req: Request, res: Response) => {
  let search_item = req.body.search_item;

  const search = `%${search_item}%`;

  const search_query = "SELECT * FROM user WHERE first_name LIKE ?";

  db.query(search_query, [search], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json({ err: "cannot find user" });

    data.forEach((element: any) => {
      delete element.password;
      delete element.date_created;
    });
    res.status(200).json(data);
  });
};

export const inbox_controller = (req: Request, res: Response) => {
  let user_id = req.body.user_id;

  const get_all = "SELECT * FROM inbox WHERE inbox.user_id = ?";

  db.query(get_all, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json({ err: "no chat rooms" });
    res.status(200).json(data);
  });
};
