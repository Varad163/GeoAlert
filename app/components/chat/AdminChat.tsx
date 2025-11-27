"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
let socket: ReturnType<typeof io> | null = null;

export default function AdminChat() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [active, setActive] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Safe getter to avoid undefined errors
  const getSessionId = (obj: any) =>
    obj?.id ?? obj?.sessionId ?? obj?.Id ?? null;

  // Load sessions
  async function loadSessions() {
    try {
      const res = await fetch("/api/chat/session");
      if (!res.ok) {
        console.error("Failed sessions", await res.text());
        return;
      }
      const data = await res.json();
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
    } catch (err) {
      console.error("Session GET error:", err);
    }
  }

  // Connect to socket + load sessions
  useEffect(() => {
    loadSessions();

    socket = io(SOCKET_URL, { withCredentials: true });

    socket.on("connect", () => {
      console.log("🟢 Admin socket connected:", socket?.id);
    });

    socket.on("new_message", (msg) => {
      const activeId = getSessionId(active);

      if (activeId && msg.sessionId === activeId) {
        setMessages((prev) => [...prev, msg]);
      }

      loadSessions();
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [active]);

  // Open chat session
  async function openSession(session: any) {
    const sessionId = getSessionId(session);

    if (!sessionId) {
      console.error("❌ Bad session object:", session);
      return;
    }

    setActive(session);
    console.log("Opening session:", sessionId);

    const res = await fetch(`/api/chat/messages/${sessionId}`);
    if (!res.ok) {
      console.error("❌ Failed to load messages:", await res.text());
      return;
    }

    const data = await res.json();
    setMessages(Array.isArray(data.messages) ? data.messages : []);

    socket?.emit("join", { sessionId });
  }

  // Send message
  function sendMessage() {
    const sessionId = getSessionId(active);
    if (!sessionId || !text.trim() || !socket) return;

    socket.emit("send_message", {
      sessionId,
      senderId: "ADMIN",
      senderRole: "ADMIN",
      message: text.trim(),
    });

    setText("");
  }

  return (
    <div className="flex h-full gap-4">

      {/* Sessions */}
      <div className="w-1/4 border-r p-2 overflow-auto">
        <h2 className="font-semibold text-lg mb-2">User Sessions</h2>

        {sessions.map((s) => {
          const sid = getSessionId(s);
          const activeId = getSessionId(active);

          return (
            <div
              key={sid}
              onClick={() => openSession(s)}
              className={`p-3 cursor-pointer rounded ${
                activeId === sid ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <div className="font-semibold">
                {s.user?.name || s.user?.email || "User"}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(s.updatedAt).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4">
          {active ? (
            messages.map((m) => (
              <div
                key={m.id}
                className={`mb-3 ${
                  m.senderRole === "ADMIN" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded ${
                    m.senderRole === "ADMIN"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {m.message}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(m.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-10">
              Select a session to start chatting.
            </p>
          )}
        </div>

        {/* Input */}
        {active && (
          <div className="p-4 flex gap-2 border-t">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 border rounded p-2"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
