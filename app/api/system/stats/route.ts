import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      users,
      alerts,
      sessions,
      safezones
    ] = await Promise.all([
      prisma.user.count(),
      prisma.alert.count(),
      prisma.chatSession.count(),
      prisma.safeZone.count(),
    ]);

    return NextResponse.json({
      users,
      alerts,
      sessions,
      safezones,
    });
  } catch (err) {
    console.error("Stats Error:", err);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
