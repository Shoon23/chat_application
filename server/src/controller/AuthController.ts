import { Request, Response } from "express";
import { db } from "../config/ConnectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generate_access_token,
  generate_refresh_token,
} from "../utils/generateTokens";

export const register_controller = (req: Request, res: Response) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const date_now = new Date();

  const sql_check = "SELECT * FROM user WHERE email = ?";

  db.query(sql_check, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json({ err: "user already exist" });

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const sql_insert =
      "INSERT INTO user (first_name, last_name, email, date_created, password) VALUES (?);";

    const values = [first_name, last_name, email, date_now, hash_password];

    db.query(sql_insert, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      const sql_get = "SELECT * FROM user WHERE email = ?";

      db.query(sql_get, [email], (err, data) => {
        const user_id = data[0].user_id;

        const access_token = generate_access_token(user_id);
        const refresh_token = generate_refresh_token(user_id);

        const { password, ...others } = data[0];
        res
          .cookie("refresh_token", refresh_token, {
            httpOnly: true,
            sameSite: false,
          })
          .status(200)
          .json({ others, access_token });
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

    const user_id = data[0].user_id;

    const access_token = generate_access_token(user_id);
    const refresh_token = generate_refresh_token(user_id);

    const { password, ...others } = data[0];

    res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: false,
      })
      .status(200)
      .json({ ...others, access_token });
  });
};

export const refresh_controller = async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return res.status(403).json({ message: "Your are not Authenticated" });
  }
  jwt.verify(refresh_token, "public_key", (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ ...err, from: "refresh-token" });
    }
    const sql_check = "SELECT * FROM user WHERE user_id = ?";

    db.query(sql_check, [decoded.user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(404).json({ msg: "user dont exist" });

      const access_token = generate_access_token(data[0].user_id);
      const new_refresh_token = generate_refresh_token(data[0].user_id);
      const { password, ...others } = data[0];

      res
        .cookie("refresh_token", new_refresh_token, { httpOnly: true })
        .status(200)
        .json({ ...others, access_token });
    });
  });
};
