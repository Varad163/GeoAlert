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
    async function init() {
 
      try {
        const r = await fetch("/api/chat/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!r.ok) {
          console.error("❌ session API failed:", await r.text());
          return;
        }

        const json = await r.json();
        if (!json.session) {
          console.error("❌ No session returned:", json);
          return;
        }

        const session = json.session;
        setSessionId(session.id);

        const msgRes = await fetch(`/api/chat/messages/${session.id}`);
        if (msgRes.ok) {
          const data = await msgRes.json();
          setMessages(Array.isArray(data.messages) ? data.messages : []);
        } else {
          console.error("❌ failed to load messages:", await msgRes.text());
          setMessages([]);
        }

        socket = io(SOCKET_URL, { withCredentials: true });

        socket.on("connect", () => {
          console.log("🟢 Socket connected:", socket?.id);
          socket?.emit("join", { sessionId: session.id });
        });

       socket.on("new_message", (msg: any) => {
  setMessages((prev) => {

    if (prev.some((m) => m.id === msg.id)) return prev;
    return [...prev, msg];
  });
});


      } catch (err) {
        console.error("❌ CHAT INIT ERROR:", err);
      }
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

    socket.emit("send_message", {
      sessionId,
      senderId: userId,
      senderRole: "USER",
      message: text.trim(),
    });

    setText("");
  }
return (
  <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">

    <div className="px-4 py-3 bg-white shadow flex items-center gap-3 sticky top-0 z-20">
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
        U
      </div>
      <div>
        <h2 className="font-semibold text-lg">Support Chat</h2>
        <p className="text-xs text-green-600">Admin is online</p>
      </div>
    </div>

    <div className="flex-1 overflow-auto p-4 space-y-4">
      {messages.map((m) => {
        const isUser = m.senderRole === "USER";

        return (
          <div
            key={m.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[70%] px-4 py-2 rounded-2xl shadow 
                ${isUser ? "bg-blue-600 text-white rounded-br-none" 
                         : "bg-white text-gray-800 rounded-bl-none"}
              `}
            >
              <p className="text-sm">{m.message}</p>
              <p className="text-[10px] opacity-80 mt-1">
                {new Date(m.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>

    <div className="backdrop-blur bg-white/80 border-t px-4 py-3 flex items-center gap-3 sticky bottom-0">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
      >
        Send
      </button>
    </div>

  </div>
);
}