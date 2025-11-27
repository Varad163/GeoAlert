import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { sessionId: string } }
) {
  try {
    const sessionId = context.params.sessionId;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 }
      );
    }

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ messages });

  } catch (err) {
    console.error("GET MESSAGES ERROR:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
