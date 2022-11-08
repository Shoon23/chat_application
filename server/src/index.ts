import express, { Express } from "express";

import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
// import dotenv from "dotenv";
import auth_routes from "./routes/Auth";

// dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const port = 3000;

// app.use(cors);

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

app.use("/auth", auth_routes);

// // io.on("connection", (socket) => {
// //   console.log(socket.id);
// //   socket.on("send_message", (data) => {
// //     console.log(data);
// //     socket.broadcast.emit("receive_message", data);
// //   });
// // });

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
