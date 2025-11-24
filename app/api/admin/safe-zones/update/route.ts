import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { id, name, lat, lng } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const updated = await prisma.safeZone.update({
    where: { id },
    data: { name, lat, lng },
  });

  return NextResponse.json({ updated });
}
