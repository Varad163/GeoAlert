"use client";

import UserChat from "@/app/components/chat/UserChat";
import { useSession } from "next-auth/react";

export default function UserChatPage() {
  const { data: session } = useSession();

  if (!session?.user?.id) return <p>Loading...</p>;

  return <UserChat userId={session.user.id} />;
}
