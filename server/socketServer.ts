// server/socketServer.ts
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import { Server } from "socket.io";
import { prisma } from "../lib/prisma";  // use your singleton client

const app = express();

const PORT = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", ({ sessionId }) => {
    if (sessionId) socket.join(sessionId);
  });

  socket.on("send_message", async ({ sessionId, senderId, senderRole, message }) => {
    const saved = await prisma.chatMessage.create({
      data: { sessionId, senderId, senderRole, message },
    });

    io.to(sessionId).emit("new_message", saved);
  });

  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
