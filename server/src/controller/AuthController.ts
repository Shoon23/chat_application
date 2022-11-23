import { Request, Response } from "express";
import { db } from "../config/ConnectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register_controller = (req: Request, res: Response) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const date_now = new Date();

  const sql_check = "SELECT * FROM user WHERE email = ?";

  db.query(sql_check, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res.status(409).json({ error: "user already exist" });

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const sql_insert =
      "INSERT INTO user (first_name, last_name, email, date_created, password) VALUES (?);";

    const values = [first_name, last_name, email, date_now, hash_password];

    db.query(sql_insert, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      const sql_get = "SELECT * FROM user WHERE email = ?";

      db.query(sql_get, [email], (err, data) => {
        const access_token = jwt.sign({ id: data[0].id }, "public_key");
        const refresh_token = jwt.sign({ id: data[0].id }, "private_key");
        const { password, ...others } = data[0];
        res
          .cookie("access_token", access_token, {
            httpOnly: true,
            sameSite: false,
          })
          .cookie("refresh_token", refresh_token, {
            httpOnly: true,
            sameSite: false,
          })
          .status(200)
          .json(others);
      });
    });
  });
};

export const login_controller = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password_ = req.body.password;

  const sql_check = "SELECT * FROM user WHERE email = ?";

  db.query(sql_check, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json({ msg: "user dont exist" });

    const check_password = await bcrypt.compare(password_, data[0].password);

    if (!check_password) return res.status(404).json({ err: "wrong password" });

    const access_token = jwt.sign({ id: data[0].id }, "public_key");
    const refresh_token = jwt.sign({ id: data[0].id }, "private_key");

    const { password, ...others } = data[0];

    res
      .cookie("access_token", access_token, { httpOnly: true, sameSite: false })
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: false,
      })
      .status(200)
      .json(others);
  });
};
