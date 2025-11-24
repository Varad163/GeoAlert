import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.alert.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
