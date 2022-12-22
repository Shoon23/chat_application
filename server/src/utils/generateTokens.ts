import jwt from "jsonwebtoken";

export const generate_access_token = (user_id: string) => {
  return jwt.sign({ user_id }, "private_key", {
    expiresIn: "10s",
  });
};

export const generate_refresh_token = (user_id: string) => {
  return jwt.sign({ user_id }, "public_key", {
    expiresIn: "1m",
  });
};
