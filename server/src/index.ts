import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import auth_routes from "./routes/Auth";
import message_routes from "./routes/Message";
import room_routes from "./routes/Room";
import { verifyToken } from "./middleware/verifyToken";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", auth_routes);

app.use(verifyToken);
app.use("/message", message_routes);
app.use("/chat-room", room_routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
