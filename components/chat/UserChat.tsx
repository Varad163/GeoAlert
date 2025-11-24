"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

let socket: ReturnType<typeof io> | null = null;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export default function UserChat({ userId }: { userId: string }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1) create/get session
    async function init() {
      const r = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const { session } = await r.json();
      setSessionId(session.id);

      // 2) fetch existing messages
      const msgRes = await fetch(`/api/chat/messages/${session.id}`);
      const { messages } = await msgRes.json();
      setMessages(messages);

      // 3) connect socket
      socket = io(SOCKET_URL, { withCredentials: true });
      socket.on("connect", () => {
        console.log("connected", socket?.id);
        if (session.id) socket?.emit("join", { sessionId: session.id });
      });

      socket.on("new_message", (msg: any) => {
        setMessages((s) => [...s, msg]);
      });
    }

    init();

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!text.trim() || !sessionId || !socket) return;
    // send over socket; server will persist and broadcast
    socket.emit("send_message", {
      sessionId,
      senderId: userId,
      senderRole: "USER",
      message: text.trim(),
    });
    setText("");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((m) => (
          <div key={m.id} className={`mb-3 ${m.senderRole === "USER" ? "text-right" : "text-left"}`}>
            <div className="inline-block bg-gray-200 p-2 rounded">{m.message}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
