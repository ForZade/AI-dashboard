import { PrismaClient } from "@/db/postgres/prisma";
import type { 
  Adapter, 
  AdapterUser, 
  AdapterAccount, 
  AdapterSession, 
  VerificationToken 
} from "next-auth/adapters";
import { generateId } from "@/lib/snowflake";

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(data: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const user = await prisma.user.create({
        data: {
          id: generateId(),
          email: data.email,
          username: data.email.split("@")[0],
          name: data.name ?? data.email.split("@")[0],
          avatar_url: data.image ?? null,
          emailVerified: data.emailVerified ?? null,
        },
      });
      return {
        id: user.id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.avatar_url,
      };
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      const user = await prisma.user.findUnique({
        where: { id: BigInt(id) },
      });
      if (!user) return null;
      return {
        id: user.id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.avatar_url,
      };
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) return null;
      return {
        id: user.id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.avatar_url,
      };
    },

    async getUserByAccount(
      provider: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<AdapterUser | null> {
      const account = await prisma.userOAuth.findUnique({
        where: {
          provider_provider_user_id: {
            provider: provider.provider,
            provider_user_id: provider.providerAccountId,
          },
        },
        include: { user: true },
      });
      if (!account) return null;
      const user = account.user;
      return {
        id: user.id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.avatar_url,
      };
    },

    async updateUser(data: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
      const user = await prisma.user.update({
        where: { id: BigInt(data.id) },
        data: {
          email: data.email,
          name: data.name,
          avatar_url: data.image,
          emailVerified: data.emailVerified,
        },
      });
      return {
        id: user.id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.avatar_url,
      };
    },

    async deleteUser(userId: string): Promise<void> {
      await prisma.user.delete({
        where: { id: BigInt(userId) },
      });
    },

    async linkAccount(account: AdapterAccount): Promise<AdapterAccount | null | undefined> {
      await prisma.userOAuth.create({
        data: {
          id: generateId(),
          user_id: BigInt(account.userId),
          provider: account.provider,
          provider_user_id: account.providerAccountId,
          access_token: account.access_token ?? null,
          refresh_token: account.refresh_token ?? null,
          expires_at: account.expires_at ? BigInt(account.expires_at) : null,
          token_type: account.token_type ?? null,
          scope: account.scope ?? null,
          id_token: account.id_token ?? null,
          session_state: account.session_state ?? null,
        },
      });
      return account;
    },

    async unlinkAccount(
      provider: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<void> {
      await prisma.userOAuth.delete({
        where: {
          provider_provider_user_id: {
            provider: provider.provider,
            provider_user_id: provider.providerAccountId,
          },
        },
      });
    },

    async createSession(session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> {
      const newSession = await prisma.session.create({
        data: {
          sessionToken: session.sessionToken,
          userId: BigInt(session.userId),
          expires: session.expires,
        },
      });
      return {
        sessionToken: newSession.sessionToken,
        userId: newSession.userId.toString(),
        expires: newSession.expires,
      };
    },

    async getSessionAndUser(
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      const sessionAndUser = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!sessionAndUser) return null;
      const { user, ...session } = sessionAndUser;
      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId.toString(),
          expires: session.expires,
        },
        user: {
          id: user.id.toString(),
          email: user.email,
          emailVerified: user.emailVerified,
          name: user.name,
          image: user.avatar_url,
        },
      };
    },

    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> {
      const updatedSession = await prisma.session.update({
        where: { sessionToken: session.sessionToken },
        data: {
          expires: session.expires,
          userId: session.userId ? BigInt(session.userId) : undefined,
        },
      });
      return {
        sessionToken: updatedSession.sessionToken,
        userId: updatedSession.userId.toString(),
        expires: updatedSession.expires,
      };
    },

    async deleteSession(sessionToken: string): Promise<void> {
      await prisma.session.delete({
        where: { sessionToken },
      });
    },

    async createVerificationToken(data: VerificationToken): Promise<VerificationToken> {
      const verificationToken = await prisma.verificationToken.create({
        data: {
          identifier: data.identifier,
          token: data.token,
          expires: data.expires,
        },
      });
      return {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
        expires: verificationToken.expires,
      };
    },

    async useVerificationToken(params: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      try {
        const verificationToken = await prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier: params.identifier,
              token: params.token,
            },
          },
        });
        return {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
          expires: verificationToken.expires,
        };
      } catch {
        return null;
      }
    },
  };
}