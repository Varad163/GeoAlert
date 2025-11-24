"use client";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
let socket: ReturnType<typeof io> | null = null;

export default function AdminChat() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [active, setActive] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function loadSessions() {
      const res = await fetch("/api/chat/session");
      const { sessions } = await res.json();
      setSessions(sessions);
    }
    loadSessions();

    // connect socket once
    socket = io(SOCKET_URL, { withCredentials: true });
    socket.on("connect", () => console.log("admin socket", socket?.id));
    socket.on("new_message", (m: any) => {
      // if message belongs to active session -> push
      setMessages((cur) => (active && m.sessionId === active.id ? [...cur, m] : cur));
      // also refresh session list for last activity ordering
      loadSessions().catch(console.error);
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [active]);

  async function openSession(session: any) {
    setActive(session);
    // fetch messages
    const res = await fetch(`/api/chat/messages/${session.id}`);
    const { messages } = await res.json();
    setMessages(messages);

    // join room
    socket?.emit("join", { sessionId: session.id });
  }

  async function sendMessage() {
    if (!active || !text.trim() || !socket) return;
    socket.emit("send_message", {
      sessionId: active.id,
      senderId: "ADMIN_ID", // replace with admin id from session
      senderRole: "ADMIN",
      message: text.trim(),
    });
    setText("");
  }

  return (
    <div className="flex h-full gap-4">
      {/* sessions list */}
      <div className="w-1/4 border-r p-2 overflow-auto">
        {sessions.map((s) => (
          <div key={s.id} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => openSession(s)}>
            <div className="font-semibold">{s.user?.name || s.user?.email || "User"}</div>
            <div className="text-xs text-gray-500">{new Date(s.updatedAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* active chat */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={`mb-3 ${m.senderRole === "ADMIN" ? "text-right" : "text-left"}`}>
              <div className={`inline-block p-2 rounded ${m.senderRole === "ADMIN" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                {m.message}
              </div>
              <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>

        <div className="p-4 flex gap-2">
          <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 border rounded p-2" placeholder="Type a message..."/>
          <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
        </div>
      </div>
    </div>
  );
}
