import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "ADMIN" | "USER";   // <- Role enums
    email: string | null;
    name: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
      email: string | null;
      name: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "USER";
    email?: string | null;
    name?: string | null;
  }
}
