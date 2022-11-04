import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const port = 5000;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.use(cors);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
});

httpServer.listen(port, () => {
  console.log("server connect");
});
