import { Request, Response } from "express";
import { db } from "../config/ConnectDB";

export const create_room_controller = (req: Request, res: Response) => {
  const user_one = req.body.sender_id;
  const user_two = req.body.receiver_id;

  const is_room_exist =
    "SELECT * FROM room WHERE user_one=? AND user_two=? OR user_one=? AND user_two=? ;";

  db.query(
    is_room_exist,
    [user_one, user_two, user_two, user_one],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) {
        const { ...others } = data[0];
        return res
          .status(200)
          .json({ ...others, message: "room already exist" });
      }

      const insert_query =
        "INSERT INTO room (sender_id,receiver_id) VALUES (?)";

      const values = [user_one, user_two];

      db.query(insert_query, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        db.query(
          is_room_exist,
          [user_one, user_two, user_two, user_one],
          (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) {
              const { ...others } = data[0];
              return res
                .status(200)
                .json({ ...others, message: "room already exist" });
            }
          }
        );
      });
    }
  );
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
  let user_id = req.params.user_id;

  const get_all = "SELECT * FROM room WHERE user_one=? OR user_two=?";

  db.query(get_all, [user_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};
