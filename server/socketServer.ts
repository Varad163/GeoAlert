// server/socketServer.ts
import http from "http";
import express from "express";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", (payload: { sessionId: string }) => {
    const { sessionId } = payload;
    if (sessionId) {
      socket.join(sessionId);
      console.log(`Socket ${socket.id} joined room ${sessionId}`);
    }
  });

  socket.on("send_message", async (payload: {
    sessionId: string;
    senderId: string;
    senderRole: "ADMIN" | "USER";
    message: string;
  }) => {
    try {
      const { sessionId, senderId, senderRole, message } = payload;

      const saved = await prisma.chatMessage.create({
        data: {
          sessionId,
          senderId,
          senderRole,
          message,
        },
      });


      io.to(sessionId).emit("new_message", saved);
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Socket server listening on port ${PORT}`);
});
