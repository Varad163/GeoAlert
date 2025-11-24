
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const session = await prisma.chatSession.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  return NextResponse.json({ session });
}

export async function GET(req: Request) {

  const sessions = await prisma.chatSession.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ sessions });
}
