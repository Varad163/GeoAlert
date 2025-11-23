import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { isSafe } = await req.json();

  const status = await prisma.userStatus.upsert({
    where: { id: session.user.id },
    update: {
      isSafe,
      lastUpdated: new Date(),
    },
    create: {
      userId: session.user.id,
      isSafe,
    },
  });

  return Response.json({ status });
}
