import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("pranav", 10);

  const admin = await prisma.user.upsert({
    where: { email: "varad@123.io" },
    update: {},
    create: {
      email: "varad@123.io",
      name: "Varad",
      passwordHash: passwordHash, // matches schema
      role: "ADMIN",
    },
  });

  console.log("Admin created:", admin);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
