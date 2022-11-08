import { Request, Response } from "express";

export const login_controller = (req: Request, res: Response) => {
  res.send("login");
};

export const register_controller = (req: Request, res: Response) => {
  res.send("register");
};
