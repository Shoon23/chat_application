import { Request, Response } from "express";
import { db } from "../config/ConnectDB";

export const login_controller = (req: Request, res: Response) => {
  res.send("login page");
};

export const register_controller = (req: Request, res: Response) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  // check if user exist
  const q = "SELECT FROM user WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json({ error: "user dont exist" });
    if (data.length)
      return res.status(409).json({ error: "user already exist" });
  });
  // create new user
  // hash password with bcrypt

  // store it in the database
};
