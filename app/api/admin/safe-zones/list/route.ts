import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const zones = await prisma.safeZone.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ zones });
}
