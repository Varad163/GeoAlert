import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { prisma } from "../lib/prisma";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

const PORT = Number(process.env.SOCKET_PORT) || 4000;

// 🔥 CREATE HTTP SERVER
const server = http.createServer(app);

// 🔥 ATTACH SOCKET.IO TO SERVER
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// 🔥 SOCKET CONNECTION HANDLER
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // Join Room
  socket.on("join", ({ sessionId }) => {
    socket.join(sessionId);
    console.log(`🔵 User joined session: ${sessionId}`);
  });

  // Send Message
  socket.on("send_message", async (msg) => {
    try {
      // Save message to DB
      const saved = await prisma.chatMessage.create({
        data: {
          sessionId: msg.sessionId,
          senderId: msg.senderId,
          senderRole: msg.senderRole,
          message: msg.message,
        },
      });

      // Emit to room
      io.to(msg.sessionId).emit("new_message", saved);

    } catch (err) {
      console.error("❌ ERROR saving message:", err);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// 🔥 START SERVER (IMPORTANT)
server.listen(PORT, "localhost", () => {
  console.log(`🚀 Socket.IO Server running at http://localhost:${PORT}`);
});
