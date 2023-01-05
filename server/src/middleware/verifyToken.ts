import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth_header = req.headers.authorization;
  const private_key = process.env.JWT_PRIVATE_KEY as string;
  const access_token = auth_header?.split(" ")[1] || "";

  jwt.verify(access_token, private_key, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ ...err, from: "verfy access" });
    }
    next();
  });
};
