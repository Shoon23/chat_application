import { Request, Response } from "express";
import { db } from "../config/ConnectDB";
import { v4 as uuidv4 } from "uuid";

export const create_room_controller = (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  const receiver_id = req.body.receiver_id;
  const contact_name = req.body.contact_name;

  const last_message = "";
  const is_seen = 0;
  const status = 0;

  const room_id = uuidv4();

  const is_room_exist =
    "SELECT * FROM inbox WHERE user_id=? and receiver_id=?;";

  db.query(is_room_exist, [user_id, receiver_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const { ...others } = data[0];
      return res.status(200).json({ ...others, message: "room already exist" });
    }

    const insert_query =
      "INSERT INTO inbox (contact_name,last_message,is_seen,status,user_id,room_id,receiver_id) VALUES (?)";

    const values = [
      contact_name,
      last_message,
      is_seen,
      status,
      user_id,
      room_id,
      receiver_id,
    ];

    db.query(insert_query, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        contact_name,
        last_message,
        is_seen,
        status,
        user_id,
        room_id,
        receiver_id,
        messasage: "room created",
      });
    });
  });
};

export const find_user = (req: Request, res: Response) => {
  let search_item = req.body.search_item;

  const search = `%${search_item}%`;

  const search_query =
    "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?";

  db.query(search_query, [search, search], (err, data) => {
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
