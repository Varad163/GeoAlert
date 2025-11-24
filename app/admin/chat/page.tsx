"use client";

import AdminChat from "@/app/components/chat/AdminChat";

export default function AdminChatPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Admin Chat</h1>
      <AdminChat />
    </div>
  );
}
