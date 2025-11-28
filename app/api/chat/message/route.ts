import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { sessionId, senderId, senderRole, message } = await req.json();

    if (!sessionId || !senderId || !senderRole || !message) {
      return NextResponse.json(
        { error: "sessionId, senderId, senderRole, message required" },
        { status: 400 }
      );
    }

    const saved = await prisma.chatMessage.create({
      data: {
        sessionId,
        senderId,
        senderRole,
        message,
      },
    });

    return NextResponse.json({ success: true, message: saved });

  } catch (err) {
    console.error("MESSAGE ERROR:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
