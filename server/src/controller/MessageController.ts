import { Request, Response } from "express";

export const send_controller = (req: Request, res: Response) => {
  res.send("hi send routes");
};
