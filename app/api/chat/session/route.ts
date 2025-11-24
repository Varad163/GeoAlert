import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// USER creates/gets their chat session
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId required" },
        { status: 400 }
      );
    }

    const session = await prisma.chatSession.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: { user: true },
    });

    return NextResponse.json({ session });
  } catch (err) {
    console.error("SESSION POST ERROR:", err);
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}

// ADMIN get all sessions
export async function GET() {
  try {
    const sessions = await prisma.chatSession.findMany({
      orderBy: { updatedAt: "desc" },
      include: { user: true },
    });

    return NextResponse.json({ sessions });
  } catch (err) {
    console.error("SESSION GET ERROR:", err);
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}
