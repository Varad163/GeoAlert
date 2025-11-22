import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("pranav", 10);

  const admin = await prisma.user.upsert({
    where: { email: "varad@123.io" },
    update: {},
    create: {
      email: "varad@123.io",
      name: "Varad",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Admin created:", admin);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
