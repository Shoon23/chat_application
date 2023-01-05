import { Request, Response } from "express";
import { db } from "../config/ConnectDB";

export const create_room_controller = (req: Request, res: Response) => {
  const sender_id = req.body.sender_id;
  const receiver_id = req.body.receiver_id;

  const is_room_exist = `SELECT member.conversation_id,COUNT(member.conversation_id) AS total_member FROM chat.member
  WHERE member.user_id = ? or member.user_id = ?
    GROUP BY member.conversation_id
      HAVING COUNT(member.conversation_id) > 1;`;

  db.query(is_room_exist, [sender_id, receiver_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const { conversation_id } = data[0];
      return res.status(200).json({ conversation_id, sender_id, receiver_id });
    }

    const create_convo = "INSERT INTO conversation() VALUES ()";

    db.query(create_convo, [], (err, data) => {
      if (err) return res.status(500).json(err);
      const add_member = "INSERT INTO member(conversation_id,user_id) VALUES ?";

      const conversation_id = data.insertId;
      const values = [
        [conversation_id, sender_id],
        [conversation_id, receiver_id],
      ];

      db.query(add_member, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({ conversation_id, sender_id, receiver_id });
      });
    });
  });
};

export const find_user = (req: Request, res: Response) => {
  let user_id = req.body.user_id;
  let search_item = req.body.search_item;

  const search = `%${search_item}%`;

  const search_query = `SELECT * FROM user 
  WHERE (user.first_name LIKE ? OR user.last_name LIKE ?)
  AND NOT user.user_id = ?;`;

  db.query(search_query, [search, search, user_id], (err, data) => {
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
  const sender_id = req.params.user_id;

  const check_inbox =
    "SELECT conversation.* FROM conversation JOIN member ON member.conversation_id = conversation.conversation_id JOIN user ON user.user_id = member.user_id WHERE user.user_id = ?;";

  db.query(check_inbox, [sender_id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) {
      const convo_id: number[] = data.map((room: any) => room.conversation_id);

      const get_inbox_info =
        "SELECT member.* ,first_name, last_name FROM user INNER JOIN member ON user.user_id = member.user_id WHERE member.conversation_id IN (?) AND (NOT member.user_id = ?);";

      db.query(get_inbox_info, [convo_id, sender_id], (err, data) => {
        if (err) return res.status(500).json(err);

        const new_data = data.map(({ user_id, ...other }: any) => {
          return {
            receiver_id: user_id,
            ...other,
            sender_id: Number(sender_id),
          };
        });

        res.status(200).json(new_data);
      });
    } else {
      res.status(200).json(data);
    }
  });
};
