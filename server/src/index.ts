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
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors);

httpServer.listen(port, () => {
  console.log("server connect");
});
