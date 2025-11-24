import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  await prisma.alert.update({
    where: { id },
    data: {
      expiresAt: new Date(), 
    },
  });

  return NextResponse.json({ success: true });
}
