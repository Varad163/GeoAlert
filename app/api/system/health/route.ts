import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check DB connection
    await prisma.$queryRaw`SELECT 1`;

    // Check Socket Server
    const socketHealth = await fetch(
      process.env.NEXT_PUBLIC_SOCKET_URL + "/health"
    )
      .then((r) => r.json())
      .catch(() => ({ status: "DOWN" }));

    return NextResponse.json({
      server: {
        status: "UP",
        timestamp: new Date(),
      },
      database: {
        status: "UP",
      },
      socket: socketHealth,
    });
  } catch (err) {
    console.error("Health Error:", err);

    return NextResponse.json(
      {
        server: { status: "UP" },
        database: { status: "DOWN" },
        socket: { status: "UNKNOWN" },
      },
      { status: 500 }
    );
  }
}
