import jwt from "jsonwebtoken";

const private_key = process.env?.JWT_PRIVATE_KEY as string;
const public_key = process.env?.JWT_PUBLIC_KEY as string;

export const generate_access_token = (user_id: string) => {
  return jwt.sign({ user_id }, private_key, {
    expiresIn: "1d",
  });
};

export const generate_refresh_token = (user_id: string) => {
  return jwt.sign({ user_id }, public_key, {
    expiresIn: "1d",
  });
};
