import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // "ADMIN" | "USER"
        };
      },
    }),
  ],

  callbacks: {
    // ROLE-BASED REDIRECT
    async redirect({ baseUrl, token }: { baseUrl: string; token?: any }) {
      if (!token) return baseUrl;

      if (token.role === "ADMIN") {
        return `${baseUrl}/admin/dashboard`;
      }

      return baseUrl; // USER → homepage
    },

    // ATTACH ROLE & ID TO JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as "ADMIN" | "USER";
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // SEND DATA TO SESSION
    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        email: token.email ?? null,
        name: token.name ?? null,
      };
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};
