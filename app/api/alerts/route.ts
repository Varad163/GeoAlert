import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      include: {
        zones: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(alerts);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching alerts" }, { status: 500 });
  }
}
