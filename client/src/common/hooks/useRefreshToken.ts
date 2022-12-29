import axios from "axios";

export const useRefreshToken = async () => {
  const res = await axios.get("http://localhost:3000/auth/refresh", {
    withCredentials: true,
  });
  return res.data;
};
