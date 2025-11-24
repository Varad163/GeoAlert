
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  if (!sessionId) return NextResponse.json({ error: "sessionId required" }, { status: 400 });

  const messages = await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages });
}
