import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      type,
      severity,
      description,
      expiresAt,
      polygon,
      adminId,
    } = body;

    if (!type || !severity || !polygon || !adminId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const alert = await prisma.alert.create({
      data: {
        description,
        type,
        severity,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        createdById: adminId,
      },
    });

    await prisma.alertZone.create({
      data: {
        alertId: alert.id,
        polygon,
      },
    });

    return Response.json({ success: true, alert }, { status: 201 });

  } catch (error) {
    console.error("ALERT CREATE ERROR:", error);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
