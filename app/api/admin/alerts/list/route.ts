import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const alerts = await prisma.alert.findMany({
    where: {
      expiresAt: {
        gt: new Date(), // Only active alerts
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ alerts });
}
