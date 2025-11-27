import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET() {
  try {
    const sessions = await prisma.chatSession.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,        // <-- THIS WAS MISSING
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ sessions });
  } catch (err) {
    console.error("❌ GET SESSIONS ERROR:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
