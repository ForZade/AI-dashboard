import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/db/postgres/prisma.client";
import { CustomPrismaAdapter } from "./prisma.adapter";
import { loginSchema } from "./validation";
import argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedData = loginSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
            include: { password: true },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isPasswordValid = await argon2.verify(
            user.password.password,
            validatedData.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: user.avatar_url,
          };
        } catch {
          throw new Error("Invalid credentials");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Add Project creation here.
    }
  }
};