import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const zones = await prisma.safeZone.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ zones });
  } catch (e) {
    return Response.json({ error: "Failed to load safe zones" }, { status: 500 });
  }
}
