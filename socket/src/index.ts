import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

const addActiveUser = (userId, socketId) => {
  let isActive = activeUsers.some((user) => user["userId"] === userId);
  if (!isActive) {
    activeUsers.push({ userId, socketId });
  }
};

const removeActiveUser = (socketId) => {
  activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
};

const findUser = (receiverId) => {
  let id = activeUsers.find((user) => {
    return user.userId === receiverId;
  });

  return id;
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    console.log("a user connected");
    console.log(activeUsers);

    addActiveUser(userId, socket.id);
    io.emit("getUsers", activeUsers);
  });

  socket.on(
    "sendMessage",
    ({ senderId, receiverId, message, conversation }) => {
      const data = findUser(receiverId);
      console.log(data);
      console.log(senderId);
      if (data?.socketId) {
        io.to(data?.socketId).emit("getMessage", {
          conversation,
          senderId,
          receiverId,
          message,
        });
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("a user disconnected");

    removeActiveUser(socket.id);
    io.emit("getUsers", activeUsers);
  });
});

httpServer.listen(8080, () => {
  console.log("running on port 8080");
});
